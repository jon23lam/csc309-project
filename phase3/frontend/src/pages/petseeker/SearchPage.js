import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../providers/RootProvider";

export const SearchPage = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { petListingsStore } = rootStore;
  const { petList } = petListingsStore;

  useEffect(() => {
    petListingsStore.initializeSearchPage();
  }, []);

  // This is temporary, wanted to keep this here to show everyone how to use observables form stores
  return <div>{JSON.stringify(petList)}</div>;
});

export default SearchPage;
