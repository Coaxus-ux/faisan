import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

export default function Tools() {
    const list = [
        {
            title: "Colores",
            img: "https://nextui.org/images/fruit-4.jpeg",
            description: "Crea y edita",
            url: "/tools/colors"
        },
    ];
    const navigate = useNavigate();
    return (
        <>
            <div className=" flex justify-center items-center h-lvh gap-4">
                {list.map((item, index) => (
                    <Card shadow="sm" key={index} isPressable onPress={() => navigate(item.url)}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={item.title}
                                className="w-full object-cover h-[140px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.description}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </>
    )
}