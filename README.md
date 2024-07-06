# lambda-miden-hack

to get started with the miden client:

```
miden init --rpc 18.203.155.106

```

To view the accounts:

```
miden account -l

```

Account ID: 0x9546b214dc1445fc

Went to:
https://testnet.miden.io/

And gave myself a private note - which is what `note.mno` is. To load the note, I did:

```
miden import note.mno
miden sync
miden consume-notes --account 0x9546b214dc1445fc 0xb72c954f400ae2bd747fde4a0554f691debcbdd4a5f35e6af87e0b5eebe49cf6
```
