import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../providers/RootProvider";

export const SearchPage = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;
  const { context } = authStore;
  const { currentUser } = context;

  useEffect(() => {
    console.log(currentUser);
  }, [context]);

  return <div>This is the searchPage</div>;
});

export default SearchPage;
