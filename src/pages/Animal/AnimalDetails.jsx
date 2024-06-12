import {useParams} from "react-router-dom";
import WeightTable from "@/components/WeightTable.jsx";
import WeightChart from "@/components/WeightChart.jsx";
import {Tabs, Tab, Card, CardBody, Button} from "@nextui-org/react";
import {MdOutlineTableChart} from "react-icons/md";
import {GiChart} from "react-icons/gi";
import AnimalDetailsCard from "@/components/AnimalDetailsCard.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import Loader from "@/components/Loader.jsx";

export default function AnimalDetails() {
    const {animalId} = useParams();
    const {getAnimalById, animal} = useAnimalStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAnimalById(animalId).then(() => {
            setIsLoading(false);
        });
    }, [animalId]);

    const onHandleClick = (e) => {
        console.log(animal)
        /*navigate(e.target.dataset.site + animalId);*/
    };
    return (

        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">{animal.name}</h1>
                            <div className="flex items-center gap-4">
                                <Button color="success" variant="flat" onClick={onHandleClick}
                                        data-site="/animal/edit/">
                                    Editar
                                </Button>
                                <Button color="secondary" variant="flat" onClick={onHandleClick}
                                        data-site="/animal/weighs/">
                                    Pesos
                                </Button>
                                <Button color="danger" variant="flat" onClick={() => {
                                    navigate(-1)
                                }}>
                                    Volver
                                </Button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <AnimalDetailsCard animal={animal} />
                            <Card className="p-5">
                                <CardBody className="flex items-center">
                                    <Tabs aria-label="Options" color="primary" variant="bordered">
                                        <Tab title={
                                            <div className="flex items-center space-x-2">
                                                <MdOutlineTableChart/>
                                                <span>Pesos</span>
                                            </div>
                                        }>
                                            <WeightTable/>
                                        </Tab>
                                        <Tab title={
                                            <div className="flex items-center space-x-2">
                                                <GiChart/>
                                                <span>Grafico</span>
                                            </div>
                                        }>
                                            <WeightChart/>
                                        </Tab>
                                    </Tabs>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )
            }
        </>
    )
}