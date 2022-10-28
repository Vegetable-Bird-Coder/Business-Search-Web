import React from "react";
import DetailInfo from "../components/DetailInfo";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import { useSelector } from "react-redux";


const Search = () => {
    const { searchResult, displaySearchResult } = useSelector(state => state.businessInfo);
    const { detailContent, displayDetailContent } = useSelector(state => state.detailInfo);
    return (
        <div className="row d-flex flex-column align-items-center">
            <div className="col-12 col-md-6 mb-5">
                <SearchForm />
            </div>

            {displaySearchResult && (
                <div className="col-md-9 search-result rounded mt-5 d-flex justify-content-center">
                    <SearchResult businessInfo={searchResult} />
                </div>
            )}

            {displayDetailContent && (
                <div className="col-md-7 mb-5">
                        <DetailInfo detailInfo={detailContent} />
                </div>
            )}


        </div>
    )
}

export default Search;