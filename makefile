

# compile the rust to wasm

compile-wasm:
	@echo "Compiling Rust to WebAssembly"
	cd ./rust && wasm-pack build --target web