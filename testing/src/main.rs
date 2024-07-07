use figment::{
    providers::{Format, Toml},
    value::{Dict, Map},
    Figment, Metadata, Profile, Provider,
};
use miden_client::{
    accounts::AccountId,
    auth::StoreAuthenticator,
    config::RpcConfig,
    crypto::RpoRandomCoin,
    notes::{NoteFile, NoteId},
    rpc::TonicRpcClient,
    store::sqlite_store::config::SqliteStoreConfig,
    store::sqlite_store::SqliteStore,
    utils::Deserializable,
    Client, ClientError, Felt,
};
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::{
    fs::File,
    io::Read,
    path::{Path, PathBuf},
    rc::Rc,
};
use tokio;
#[derive(Debug, Default, Eq, PartialEq, Deserialize, Serialize)]
pub struct CliConfig {
    pub rpc: RpcConfig,
    pub store: SqliteStoreConfig,
    pub default_account_id: Option<String>,
}

// Make `ClientConfig` a provider itself for composability.
impl Provider for CliConfig {
    fn metadata(&self) -> Metadata {
        Metadata::named("CLI Config")
    }

    fn data(&self) -> Result<Map<Profile, Dict>, figment::Error> {
        figment::providers::Serialized::defaults(CliConfig::default()).data()
    }

    fn profile(&self) -> Option<Profile> {
        // Optionally, a profile that's selected by default.
        None
    }
}

const CLIENT_CONFIG_FILE_NAME: &str = "./miden-client.toml";

pub fn load_config_file() -> Result<(CliConfig, PathBuf), String> {
    let mut current_dir = std::env::current_dir().map_err(|err| err.to_string())?;
    current_dir.push(CLIENT_CONFIG_FILE_NAME);
    let config_path = current_dir.as_path();

    let cli_config = load_config(config_path)?;

    Ok((cli_config, config_path.into()))
}

/// Loads the client configuration.
fn load_config(config_file: &Path) -> Result<CliConfig, String> {
    Figment::from(Toml::file(config_file))
        .extract()
        .map_err(|err| {
            format!(
                "Failed to load {} config file: {err}",
                config_file.display()
            )
        })
}

#[tokio::main]
async fn main() -> Result<(), String> {
    let (cli_config, _config_path) = load_config_file()?;

    let store = SqliteStore::new(&cli_config.store).map_err(ClientError::StoreError)?;
    let store = Rc::new(store);

    let mut rng = rand::thread_rng();
    let coin_seed: [u64; 4] = rng.gen();

    let rng = RpoRandomCoin::new(coin_seed.map(Felt::new));
    let authenticator = StoreAuthenticator::new_with_rng(store.clone(), rng);

    let mut client = Client::new(
        TonicRpcClient::new(&cli_config.rpc),
        rng,
        store,
        authenticator,
        true,
    );

    let hex_value = "0x9d42b8b89361af5a";

    let id = match AccountId::from_hex(hex_value) {
        Ok(account_id) => account_id,
        Err(e) => {
            // Handle the error here, for example by printing an error message
            println!("Failed to create AccountId: {:?}", e);
            // Exit the function early if an error occurs
            panic!("{}", e);
        }
    };

    let (account, _) = match client.get_account(id) {
        Ok(account) => account,
        Err(e) => {
            // Handle the error here, for example by printing an error message
            println!("Failed to get account: {:?}", e);
            // Exit the function early if an error occurs
            panic!("{}", e);
        }
    };

    let is_on_chain = account.is_on_chain();

    println!("note details");

    let path = "note.mno";

    let mut current_dir = std::env::current_dir().map_err(|err| err.to_string())?;
    current_dir.push(path);

    let mut contents = vec![];
    let mut _file = File::open(current_dir)
        .and_then(|mut f| f.read_to_end(&mut contents))
        .map_err(|err| err.to_string());

    let note_file = NoteFile::read_from_bytes(&contents).map_err(|err| err.to_string())?;

    let result = client
        .import_note(note_file)
        .await
        .map_err(|err| err.to_string());

    if let Ok(note_id) = result {
        println!("Succesfully imported note {}", note_id.inner());
    } else {
        println!("Failed to parse file {}", path.to_string());
    }

    return Ok(());
}
