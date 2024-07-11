import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutoCompleteProps {
    width: string;
    label: string;
    suggestionsData: any;
    value: string;
    setValue: any;
}

export default function AutoComplete({
    width,
    label,
    suggestionsData,
    value,
    setValue
}: AutoCompleteProps) {
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
        setSuggestions(suggestionsData);
    }, [suggestionsData]);

    const getSuggestions = (value: any) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : suggestionsData.filter((node: any) => {
            return node.key.toLowerCase().includes(inputValue);
        });
    };

    const getSuggestionValue = (suggestion: any) => suggestion.key;

    const renderSuggestion = (suggestion: any) => {
        console.log(suggestion);
        return (
            <div className='px-2 py-1 cursor-pointer text-black hover:bg-gray-200'>
                {suggestion.key}
            </div>
        );
    };

    const onChange = (event: any, { newValue }: any) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }: any) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: label,
        value,
        onChange,
        className: `border h-9 border-gray-300 rounded-md p-2 focus:outline-none w-full`
    };

    const theme = {
        container: `relative w-${width}`,
        input: `w-full`,
        suggestionsContainer: `absolute z-10 bg-white rounded-md mt-1 overflow-y-auto max-h-40 w-full`,
        suggestionsList: `list-none p-0 m-0`,
        suggestion: `cursor-pointer px-2 py-1 hover:bg-gray-200`,
        suggestionHighlighted: `bg-gray-200`
    };

    return (
        <div className={`my-5`}>
            <label className="block mb-2">{label}</label>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
            />
        </div>
    );
}
