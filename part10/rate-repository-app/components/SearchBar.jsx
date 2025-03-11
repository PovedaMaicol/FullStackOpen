import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <Searchbar
      placeholder="Search repositories..."
      onChangeText={setSearchKeyword}
      value={searchKeyword}
      style={{
        margin: 10,
        borderRadius: 8,
        elevation: 2,
      }}
    />
  );
};

export default SearchBar;
