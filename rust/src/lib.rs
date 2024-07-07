use core::fmt::Debug;
use figment::{
    providers::{Format, Toml},
    value::{Dict, Map},
    Figment, Metadata, Profile, Provider,
};
use miden_cli::utils::parse_account_id;
use miden_client::{
    auth::StoreAuthenticator, config::RpcConfig, crypto::RpoRandomCoin, rpc::TonicRpcClient,
    store::sqlite_store::config::SqliteStoreConfig, store::sqlite_store::SqliteStore, Client,
    ClientError, Felt,
};
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::{
    path::{Path, PathBuf},
    rc::Rc,
};
use wasm_bindgen::prelude::*;

// general testing

#[derive(Debug, Default, Eq, PartialEq, Deserialize, Serialize)]
pub struct CliConfig {
    /// Describes settings related to the RPC endpoint
    pub rpc: RpcConfig,
    /// Describes settings related to the store.
    pub store: SqliteStoreConfig,
    /// Address of the Miden node to connect to.
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

const CLIENT_CONFIG_FILE_NAME: &str = "miden-client.toml";

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

pub fn client() -> Result<(), String> {
    let (cli_config, _config_path) = load_config_file()?;

    let store = SqliteStore::new(&cli_config.store).map_err(ClientError::StoreError)?;
    let store = Rc::new(store);

    let mut rng = rand::thread_rng();
    let coin_seed: [u64; 4] = rng.gen();

    let rng = RpoRandomCoin::new(coin_seed.map(Felt::new));
    let authenticator = StoreAuthenticator::new_with_rng(store.clone(), rng);

    let client = Client::new(
        TonicRpcClient::new(&cli_config.rpc),
        rng,
        store,
        authenticator,
        true,
    );

    println!("hello");

    return Ok(());
}

#[test]
pub fn test_client() {
    client();
}

// wasm exports
#[wasm_bindgen]
pub fn tester() -> JsValue {
    JsValue::from_str(&format!("Hello from rust!"))
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
