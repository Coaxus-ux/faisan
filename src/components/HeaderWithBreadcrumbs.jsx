import {Breadcrumbs, Button, BreadcrumbItem} from "@nextui-org/react";
import {IoIosArrowBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

HeaderWithBreadcrumbs.propTypes = {
    breadcrumbTitle: PropTypes.string,
    pageTitle: PropTypes.string,
};

export default function HeaderWithBreadcrumbs({breadcrumbTitle, pageTitle}) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex mb-10">
                <Breadcrumbs>
                    <BreadcrumbItem
                        onClick={() => navigate("/tools")}
                        underline
                    >
                        Inicio
                    </BreadcrumbItem>
                    <BreadcrumbItem>{breadcrumbTitle}</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="flex py-4 align-middle items-center gap-2">
                <Button variant="light" color="warning" isIconOnly onPress={() => navigate("/tools")}> <IoIosArrowBack/></Button>
                <h1 className="text-2xl font-bold">{pageTitle}</h1>
            </div>

        </div>
    );
}
;

