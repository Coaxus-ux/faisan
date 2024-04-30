import React from "react";
import Logo from '@/assets/Logo.svg'
import {useLoginStore} from "@/store/LoginStore";
import {Button, Input} from "@nextui-org/react";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import {Checkbox} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {notify} from "@/hooks/notify";

export default function Login() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = React.useState(false);

    const {login, isLoading, getIsLogged} = useLoginStore();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const loginHandler = async () => {
        const {email, password, rememberMe} = user;
        if (email === '' || password === '') {
            notify('Los campos no pueden estar vacíos', 'error');
            return;
        }
        await login(email, password, rememberMe);
        if (getIsLogged()) {
            notify('Inicio de sesión exitoso');
            navigate('/dashboard');
            return;
        }
        notify('Error al iniciar sesión', 'error');
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <img alt="" src={Logo} className="h-8 w-auto"/>
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Finlandia Panel 🐄
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Sistema de gestión de ganado bovino. 🐄
                        </p>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <Input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>

                            <div className="col-span-6">
                                <Input
                                    label="Contraseña"
                                    name="password"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <IoMdEye
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            ) : (
                                                <IoMdEyeOff
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </div>
                            <div className="col-span-6">
                                <Checkbox
                                          onChange={() => setUser({...user, rememberMe: !user.rememberMe})}
                                          name="rememberMe"
                                          value={user.rememberMe}
                                >
                                    Recordar Sesión
                                </Checkbox>
                            </div>
                            <div className="col-span-6">
                                <Button color="primary" className="w-full" onClick={loginHandler} isLoading={isLoading}>
                                    Iniciar Sesión
                                </Button>
                                <p className='text-white invisible'>absdbasdbkjabsdkjbaskdbakbdkjabsdkjbasdkjbaksjbdkjabsdkjbsadkjbaskjdbkjsbdkjbaskdbaskjbdkjsabdk</p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

        </section>
    )
}