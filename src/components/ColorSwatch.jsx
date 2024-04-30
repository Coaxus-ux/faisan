import {Card, CardFooter, Button, CardBody} from "@nextui-org/react";
import ModalUpdateColor from "@/components/ModalUpdateColor.jsx";
import PropTypes from 'prop-types';
ColorSwatch.propTypes = {
    color: PropTypes.object.isRequired
}
export default function ColorSwatch({color}) {

    const style = {
        backgroundColor: color.animalHex
    };

    return (
        <Card
            radius="lg"
            className={`w-52 h-56`}
        >
            <CardBody style={style} className="h-4/5">
            </CardBody>
            <CardFooter
                className="flex gap-3 h-1/5 justify-between">
                <p className="text-tiny">{color.animalColor} </p>
                <ModalUpdateColor colorProp={color}/>
            </CardFooter>
        </Card>

    )
}