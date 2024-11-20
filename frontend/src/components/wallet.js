import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownBasename,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { base } from 'wagmi/chains';
import { useMintifyContext } from '../Context/mintifyContext';




export default function WalletComponent({withWalletAggregator = false}) {
  
  const { address } = useMintifyContext();


  return (
    <div className="flex justify-end">
   
      <Wallet >
          <ConnectWallet withWalletAggregator={withWalletAggregator} className='bg-[#8080d7]'>
            <Avatar className="w-5 w-full" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity hasCopyAddressOnClick>
              <Avatar  address
={address} chain={base} />
              <Name address
={address} chain={base} />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
  
    </div>
  );
}