import React, { memo, useEffect, useState } from "react";
// import Wallet from 'ethereumjs-wallet';
// var Wallet = require("ethereumjs-wallet").default;
import { ethers } from "ethers";
import {
	Background2 as Background,
	BackButton,
	Header,
	NumberKeyboard,
} from "../components";
import { useStoreActions } from "../hooks/storeHooks";
import { Navigation } from "../types";
import secure from "../secure";
import { generateMnemonic, mnemonicToSeed, accountFromSeed } from "../utils";

type Props = {
	navigation: Navigation;
};

const SetPinScreen = ({ navigation }: Props) => {
	const initialMessage = "Create your passcode";
	const confirmMessage = "Confirm your passcode";
	const [pinMessage, setPinMessage] = useState(initialMessage);
	const [pin, setPin] = useState([]);
	const [pin1, setPin1] = useState([]);
	const [pinOk, setPinOk] = useState(false);

	const addWallet = useStoreActions((actions) => actions.addWallet);
	const addDefaultAccount = useStoreActions(
		(actions) => actions.addDefaultAccount
	);

	const addAccount = useStoreActions((actions) => actions.addAccount);

	useEffect(() => {
		if (pin.length === 4 && pin1.length === 0) {
			setPin1(pin);
			setPin([]);
			setPinMessage(confirmMessage);
		}

		if (pin.length === 4 && pin1.length === 4) {
			if (JSON.stringify(pin) === JSON.stringify(pin1)) {
				setPinOk(true);
			} else {
				setPinMessage("Create your passcode");
				setPin([]);
				setPin1([]);
			}
		}
	}, [pin]);

	const _onPressNumber = (n: number) => {
		const setPin = (pin: number[]) => {
			setPin([...pin, n]);
		};
	};

	useEffect(() => {
		async function generate() {
			// var mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16)); // 生成助记词
			// var path = "m/44'/60'/0'/0/0"; // 定义路径
			// var wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
			// console.log(mnemonic);
			// console.log(wallet);

			let wallet = ethers.Wallet.createRandom();

			// 打印出钱包的地址
			console.log(wallet.address);

			// 打印出钱包的助记词
			console.log(wallet.mnemonic.phrase);

			// 打印出钱包的派生路径
			console.log(wallet.mnemonic.path);
			// var wallet1 = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, wallet.mnemonic.path);
			// console.log(wallet1.address);
			// console.log(wallet1);
			// // Generate a random private key
			// const privateKey = await ethers.utils.hexlify(ethers.utils.randomBytes(32));
			// // Create a wallet instance from the private key
			// const wallet = await new ethers.Wallet(privateKey);
			const privateKey = await wallet.privateKey;
			const mnemonic = await wallet.mnemonic;
			// // Get the address of the wallet
			const address = await wallet.address;
			const publicKey = await wallet.publicKey;
			// // const wallet = await Wallet.generate();
			// // const mnemonic = await wallet.getMnemonic();
			// // const seed = await wallet.getSeed().toString("hex");
			// console.log(address);
			// console.log(1111111);
			// console.log(wallet.mnemonic);

			// console.log(await ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0"));
			// console.log(new ethers.Wallet(privateKey));
			// console.log(111111);

			addWallet({
				passcode: pin.join(""),
				address: address,
				publicKey: publicKey,
				// mnemonic: mnemonic,
				// seed: privateKey,
			});
			secure.setItem(address, { mnemonic: mnemonic, privateKey: privateKey });
		}

		if (pinOk) {
			generate();
		}
	}, [pinOk]);

	return (
		<Background noMenu skipHeader>
			<BackButton goBack={() => navigation.navigate("Onboarding")} />
			<Header>{pinMessage}</Header>

			<NumberKeyboard onPress={_onPressNumber} pin={pin} />
		</Background>
	);
};

export default memo(SetPinScreen);
