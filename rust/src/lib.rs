// use std::ffi::CString;
// use std::os::raw::c_char;
use wasm_bindgen::prelude::*;

// This is the function we want to call from React
#[wasm_bindgen]
pub fn tester() -> JsValue {
    JsValue::from_str(&format!("Hello from rust!"))
}

// static HELLO: &'static str = "hello from rust";

// #[wasm_bindgen]
// pub fn get_hello() -> *mut c_char {
//     let s = CString::new(HELLO).unwrap();
//     s.into_raw()
// }

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
