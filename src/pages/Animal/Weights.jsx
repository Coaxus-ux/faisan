import {useParams} from "react-router-dom";
import WeightComponent from "@/components/weightComponent.jsx";
import {Button, Card, DateInput, Input, ScrollShadow, Textarea} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useWeightStore} from "@/store/weightStore.js";
import {padTo2Digits} from "@/utils/padTo2Digits.js";
import {notify} from "@/hooks/notify.jsx";

export default function Weights() {
    const {animalId} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [weight2Save, setWeight2Save] = useState({
        weight: undefined,
        animalBirthDate: "",
        weighingDescription: ""
    });
    const {getWeightAPI, getWeights, saveWeightAPI} = useWeightStore();
    useEffect(() => {
        getWeightAPI(animalId);
    }, [animalId, saveWeightAPI]);
    const onHandleSave = () => {
        for (const key in weight2Save) {
            if (weight2Save[key] === "") {
                notify("Por favor llene todos los campos", "error");
                return;
            }
        }
        setIsLoaded(true);
        saveWeightAPI(animalId, weight2Save.weight, weight2Save.animalBirthDate, weight2Save.weighingDescription)
            .then(() => {
                notify("Registro guardado", "success");
                getWeightAPI(animalId);
            })
            .finally(() => {
                setIsLoaded(false);
            });
        setWeight2Save({
            weight: undefined,
            animalBirthDate: "",
            weighingDescription: ""

        })
    };
    const onHandleChange = (e) => {
        if (!Object.prototype.hasOwnProperty.call(e, "target")) {
            setWeight2Save({
                ...weight2Save,
                animalBirthDate: `${e.year}-${padTo2Digits(e.month)}-${padTo2Digits(e.day)}T00:00:00.000Z`
            })
            return;
        }
        setWeight2Save({
            ...weight2Save, [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex justify-center gap-5">
            <div className="flex justify-center items-center h-lvh">
                <Card className="p-4 flex flex-col">
                    <h1 className="text-3xl font-bold px-10 py-4">Historial</h1>
                    <ScrollShadow className="flex flex-col h-96 w-96" id="scrollWeight">
                        {
                            getWeights().map((weight) => (
                                <WeightComponent key={weight.id} weight={weight}/>
                            ))
                        }
                    </ScrollShadow>

                </Card>
            </div>
            <div className="flex justify-center items-center gap-4">
                <Card className="p-4 flex gap-3">
                    <h1 className="text-3xl font-bold p-10">Agregar un nuevo registro</h1>
                    <div className="flex gap-3">
                        <Input isRequired type="number" variant="flat" label="Peso en KG" name="weight"
                               value={weight2Save.weight}
                               onChange={onHandleChange}/>
                        <DateInput
                            onChange={onHandleChange}
                            isRequired
                            label="Fecha de pesaje"
                            name="dateWeight"
                            granularity="day"
                        />
                    </div>
                    <Textarea
                        isRequired
                        onChange={onHandleChange}
                        label="Descripción"
                        placeholder="Alguna descripción del animal o dato relevante"
                        className="w-full"
                        name="weighingDescription"
                        value={weight2Save.weighingDescription}
                    />
                    <Button color="primary" isLoading={isLoaded}
                            onClick={onHandleSave}>{isLoaded ? "Guardando" : " Guardar"}</Button>
                    <Button color="danger" variant={
                        "flat"} onClick={() => window.history.back()
                    }>Volver</Button>

                </Card>
            </div>
        </div>

    )
}