import React, { useCallback, useEffect } from "react";
// import type {PropsWithChildren} from 'react';
import { Linking, SafeAreaView } from "react-native";
import Product from "./screens/Product";
import { CartProvider } from "./components/CartContext";
import CartPage from "./components/Cart";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): React.JSX.Element {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      "url",
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);
  return (
    <StripeProvider
      publishableKey="pk_test_51HxFijD844BjnaxyOxdQIMYMpNObyRhASjHLre8t5qZWMplBlJF7e29THoFD0ZjIeRE1tadOynKLSj2xZq0pYEWx004jgXygol"
      // merchantIdentifier="merchant.com.your.identifier" // Optional, for Apple Pay
    >
      <SafeAreaView style={{ flex: 1 }}>
        <CartProvider>
          <Product />
          <CartPage />
        </CartProvider>
      </SafeAreaView>
    </StripeProvider>
  );
}

export default App;

// {
//   "$schema": "https://json.schemastore.org/tsconfig",
//   "display": "React Native",
//   "compilerOptions": {
//     "target": "esnext",
//     "module": "es2015",
//     "types": ["react-native", "jest"],
//     "lib": [
//       "es2019",
//       "es2020.bigint",
//       "es2020.date",
//       "es2020.number",
//       "es2020.promise",
//       "es2020.string",
//       "es2020.symbol.wellknown",
//       "es2021.promise",
//       "es2021.string",
//       "es2021.weakref",
//       "es2022.array",
//       "es2022.object",
//       "es2022.string"
//     ],
//     "allowJs": true,
//     "jsx": "react-native",
//     "noEmit": true,
//     "isolatedModules": true,
//     "strict": true,
//     "moduleResolution": "bundler",
//     "customConditions": ["react-native"],
//     "allowImportingTsExtensions": true,
//     "allowArbitraryExtensions": true,
//     "resolveJsonModule": true,
//     "resolvePackageJsonImports": false,
//     "allowSyntheticDefaultImports": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     // Causes issues with package.json "exports"
//     "forceConsistentCasingInFileNames": false
//   },
//   "exclude": [
//     "node_modules",
//     "babel.config.js",
//     "metro.config.js",
//     "jest.config.js"
//   ]
// }
