import {TbReportSearch} from "react-icons/tb";
import {TiDelete} from "react-icons/ti";
import {Button, Input, Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {initialFilters} from "@/utils/initialFilters";
export default function SearchComponent() {
    const [filters, setFilters] = useState(initialFilters);
    const {getAllFertilisation, fertilisation} = useFertilisationStore();

    useEffect(() => {
        getAllFertilisation();
        // eslint-disable-next-line
    }, []);
    const handleFilter = (e) => {
        setFilters({
            ...filters, [e.target.name]: {
                ...filters[e.target.name], value: e.target.value,
            }
        });
    };
    const onDeleteFilter = (key) => {
        setFilters({
            ...filters, [key]: {
                ...filters[key], id: "", value: "",
            }
        });
    };
    const lengthFilters = () => {
        return Object.entries(filters).filter(([key, data]) => data.value).length === 0;
    };
    const handleClear = () => {
        setFilters(initialFilters);
    }
    return (<section className="shadow bg-white rounded p-5 flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <TbReportSearch size="30"/>
                    <h3 className="font-bold text-2xl">Buscador de registros.</h3>
                </div>
                <Button color="success" variant="flat" className="px-8" onClick={getAllFertilisation}>Crear
                    nuevo</Button>
            </div>
            <div className="flex gap-2 items-center h-16">
                <div className="flex gap-1 items-center">
                    <Input label="Fecha nacimiento" type="date" name="bornDate" onChange={handleFilter}
                           value={filters.bornDate.value}/>
                    <Autocomplete
                        label="Estado animal"
                        className="max-w-xs"
                        name="state"
                        defaultItems={animals}
                        onSelectionChange={(e) => {
                            setFilters({
                                ...filters, state: {
                                    ...filters.state, value: e,
                                }
                            })
                        }}
                        onKeyDown={(e) => e.continuePropagation()}
                        selectedKey={filters.state.value}
                    >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Autocomplete
                        label="Tipo de nacimiento"
                        className="max-w-xs"
                        defaultItems={fertilisation}
                        name="birthType"
                        onSelectionChange={(e) => {
                            if (!e) return;
                            setFilters({
                                ...filters, birthType: {
                                    ...filters.birthType,
                                    value: fertilisation.find((item) => item.id === e).typeFertilisation,
                                    id: e || ""
                                }
                            })
                        }}
                        onKeyDown={(e) => e.continuePropagation()}
                        selectedKey={filters.birthType.id}
                    >
                        {(item) => <AutocompleteItem key={item.id}>{item.typeFertilisation}</AutocompleteItem>}
                    </Autocomplete>
                    <Input label="Numero animal" type="number" name="number" onChange={handleFilter} autoComplete="off"
                           value={filters.number.value}/>
                    <Input label="Numero FEDEGAN" type="number" name="fedeganNumber" onChange={handleFilter}
                           autoComplete="off"
                           value={filters.fedeganNumber.value}/>
                </div>

            </div>
            <div className="bg-default-100 p-3 rounded-2xl flex items-center h-16 justify-between">
                <div className="flex gap-1 items-center">
                    <p className="text-sm text-default-600">Filtros aplicados: </p>
                    {Object.entries(filters).map(([key, data]) => {
                        if (!data.value) return null;
                        return (<div
                                key={key}
                                className="bg-default-300 shadowp p-0.5 rounded-2xl px-2 flex items-center gap-1 text-sm text-default-600">
                                <TiDelete size="18" className="hover:text-red-400 cursor-pointer text-default-700"
                                          onClick={() => {
                                              onDeleteFilter(key)
                                          }}/>
                                {data.name}: {data.value}
                            </div>)
                    })}
                </div>
                <Button color="danger" variant="flat" isDisabled={lengthFilters()} onClick={handleClear}
                        className="h-full self-end">Limpiar</Button>
            </div>
        </section>)
}

export const animals = [{
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world"
}, {label: "Dog", value: "dog", description: "The most popular pet in the world"}, {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal"
}, {label: "Lion", value: "lion", description: "The king of the jungle"}, {
    label: "Tiger",
    value: "tiger",
    description: "The largest cat species"
}, {label: "Giraffe", value: "giraffe", description: "The tallest land animal"}, {
    label: "Dolphin", value: "dolphin", description: "A widely distributed and diverse group of aquatic mammals",
}, {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"}, {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids"
}, {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
}, {
    label: "Whale", value: "whale", description: "Diverse group of fully aquatic placental marine mammals",
}, {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"}, {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile"
},];
