import {BsArrowUp, BsArrowDown} from "react-icons/bs";
import {LiaBalanceScaleSolid} from "react-icons/lia";
import {ScrollShadow} from "@nextui-org/react";
import Props from "prop-types";
import {format} from "date-fns";
import {es} from "date-fns/locale/es";
import classNames from "classnames";
import EditWeightModal from "@/components/EditWeightModal.jsx";

WeightComponent.propTypes = {
    weight: Props.object.isRequired
}
export default function WeightComponent({weight}) {

    const weightChangeController = (weightChange) => {
        if (weightChange < 0) return <BsArrowDown/>;
        if (weightChange > 0) return <BsArrowUp/>;
        return <LiaBalanceScaleSolid/>;
    }
    return (
        <div className="min-h-52 ">
            <div className="p-6 grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                        <span>{weight.weightAnimal}</span>
                        <span className="text-2xl font-normal text-gray-500 dark:text-gray-400">Kg</span>
                    </div>
                    <div className={classNames("flex items-center gap-2", {
                        "text-red-500": weight.weightChange < 0,
                        "text-green-500": weight.weightChange > 0
                    })}>
                        {weightChangeController(weight.weightChange)}
                        <span>{weight.weightChange} Kg</span>
                    </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                        <span>Tomado el </span>
                        <span
                            className="font-medium">{format(new Date(weight.dateWeight), 'dd MMM yyyy', {locale: es})}</span>
                    </div>
                </div>
                <ScrollShadow hideScrollBar className="max-h-20">
                    <p className="text-gray-700 dark:text-gray-300">
                        {weight.weighingDescription}
                    </p>
                </ScrollShadow>
                <div className="flex justify-end">
                    <EditWeightModal weight={weight}/>
                </div>
            </div>
        </div>
    )
}