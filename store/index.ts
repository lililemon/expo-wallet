import {
  Generic,
  generic,
  Computed,
  computed,
  createStore,
  action,
  Action,
  persist,
} from "easy-peasy";
import storage from "../storage";

export interface Wallet {
  passcode: number;
  address:string;
  publicKey:string
  // mnemonic: string[];
  // seed: string;
}

export interface Account {
  index: number;
  title: string;
  derivationPath: string;
}

export interface WalletModel<K> {
  wallet: Generic<K>;
  // accounts: Account[];
  wallets:Wallet[];
  hasWallet: Computed<WalletModel<K>, Wallet | false>;
  addWallet: Action<WalletModel<K>, K>;
  addDefaultAccount: Action<WalletModel<K>, K>;
  addAccount: Action<WalletModel<K>, K>;
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: generic({}),
      // accounts: [],
      wallets:[],
      hasWallet: computed(
        (state) =>
          Object.keys(state.wallet).length !== 0 
          // && state.accounts.length !== 0
      ),
      addWallet: action((state, payload) => {
        state.wallet = {
          passcode: payload.passcode,
          address:payload.address,
          publicKey:payload.publicKey
          // mnemonic: payload.mnemonic,
          // seed: payload.seed,
          // current:true
        };
        // state.wallets.forEach((item, index) => {
        //     item.current = false;
        // });
        state.wallets.push(
          state.wallet
        )
      }),
      // addDefaultAccount: action((state, payload) => {
      //   state.accounts.push({
      //     index: 0,
      //     title: "default",
      //     derivationPath: "bip44Change",
      //   });
      // }),
      // addAccount: action((state, payload) => {
      //   state.accounts.push({
      //     index: payload.index,
      //     title: payload.title,
      //     derivationPath: "bip44Change",
      //   });
      // }),
    },
    {
      storage: storage,
    }
  )
);

export default store;
