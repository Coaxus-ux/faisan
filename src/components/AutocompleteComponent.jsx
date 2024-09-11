import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import PropTypes from "prop-types";
import {useAsyncList} from "@react-stately/data";
import {useParentsStore} from "@/store/ParentsStore.js";
import React, {useEffect} from "react";
import {differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, format} from "date-fns";
import {es} from "date-fns/locale/es";

AutocompleteComponent.propTypes = {
    label: PropTypes.string,
    sex: PropTypes.string,
    birthDate: PropTypes.string,
    isDisabled: PropTypes.bool,
    onHandleChangeParentsInput: PropTypes.func,
}

export default function AutocompleteComponent({label, sex, birthDate, isDisabled, onHandleChangeParentsInput}) {
    const {getProspectiveParents} = useParentsStore();
    const list = useAsyncList({
        async load({filterText}) {
            if (isDisabled) return {items: []};

            const response = await getProspectiveParents(birthDate, filterText, sex);

            return {
                items: response,
            };
        },
    });

    return (
        <>
            <Autocomplete
                className="w-full"
                label={label}
                inputValue={list.filterText}
                isLoading={list.isLoading}
                items={list.items}
                onInputChange={list.setFilterText}
                placeholder="Escribe para buscar ..."
                onSelectionChange={(key) => {
                    onHandleChangeParentsInput(key, sex);
                }}
            >
                {(item) => {
                    return (
                        <AutocompleteItem
                            key={item.id}
                            value={item.id}
                            className="capitalize"
                            textValue={item.name}
                        >
                            <div className="flex flex-col">
                                <p className="font-semibold text-md">{item.name}</p>
                                <p className="text-sm">N°: {item.animalFarmNumber}</p>
                                <p className="text-sm">FEDGAN: {item.animalFEDGAN}</p>
                            </div>
                        </AutocompleteItem>
                    )
                }}
            </Autocomplete>

        </>
    )
}
