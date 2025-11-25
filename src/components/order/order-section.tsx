import { useState, useRef } from "react"
import type { ElementProps } from "../../props/element"
import { Div } from "../autorender/autorender"
import { OrderStepCard } from "../order-step"
import { ProgressPath } from "../progress-path"
import { Input } from "../input"
import { useNavigate } from "react-router-dom"
import { getPriceList } from "../price-list"
import OrderPopup from "./order-popup"
import PriceCard from "../price-card"
import { 
    Brush,
    UserRound,
    CreditCard,
    Mail,
    Phone,
    NotebookPen,
    Image
} from "lucide-react"
import { sendEmail } from "./utils/send-email"

export interface OrderDataProps {
    package: 1 | 2 | 3 | null;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    notes: string;
    image: string | null;
}

export default function OrderSection (props?: ElementProps) {
    const navigate = useNavigate();
    const iconActiveProps = {
        className: "size-6 z-1",
        color: "var(--color-zinc-100)",
        strokeWidth: 1.6
    }
    const iconNotActiveProps = {
        className: "size-6 z-1",
        color: "var(--color-zinc-300)",
        strokeWidth: 1.6
    }
    const inputIconProps = {
        className: "size-5 z-1",
        color: "var(--color-zinc-200)",
        strokeWidth: 1.6
    }
    const [progressState, setProgressState] = useState(
        [
            {
                active: true,
                done: false,
            },
            {
                active: false,
                done: false,
            },
            {
                active: false,
                done: false,
            }
        ]
    );
    const [orderData, setOrderData] = useState<OrderDataProps>({
        package: null,
        user: {
            name: "",
            email: "",
            phone: ""
        },
        notes: "",
        image: null
    });
    const [formIndex, setFormIndex] = useState<1 | 2 | 3>(1);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [openPopup, setOpenPopup] = useState(false);

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return regex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const regex = /^\d{8,15}$/;
        
        return regex.test(phone);
    };

    const updateOrderData = (key: keyof OrderDataProps, value: string | number | null) => {
        setOrderData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const updateUserData = (key: keyof OrderDataProps["user"], value: string | number | null) => {
        setOrderData(prev => ({
            ...prev,
            user: {
            ...prev.user,
            [key]: value,
            },
        }));
    };

    const validateInput = (index: 1 | 2 | 3, type: "prev" | "next" | "any"): boolean => {
        if (type === "prev" && index > 1) return true;

        if ((type === "next" || type === "any") && index <= 3) {
            if (index === 1) return orderData.package !== null;
            if (index === 2) {
                const { user, notes } = orderData;

                return user.name.trim() !== "" && (user.email.trim() !== "" && validateEmail(user.email.trim())) && (user.phone.trim() !== "" && validatePhone(user.phone.trim())) && notes.trim() !== "";
            }
            if (index === 3) return orderData.image !== null;
        }

        return false;
    };

    const changeFormIndex = (type: "prev" | "next") => {
        setFormIndex(prev => {
            let newFormIndex: 1 | 2 | 3;

            if (type === "prev") {
                const decValue = prev - 1;

                newFormIndex = (decValue >= 1 ? decValue : prev) as 1 | 2 | 3;
            } 
            else {
                const incValue = prev + 1;

                newFormIndex = (incValue <= 3 ? incValue : prev) as 1 | 2 | 3;
            }

            const newProgressState = progressState.map((_, index) => {
                const newDoneState = validateInput((index + 1) as 1 | 2 | 3, "any");

                if (index < newFormIndex) {
                    if (index === newFormIndex - 1) {
                        return { 
                            active: true, 
                            done: newDoneState
                        };
                    }

                    return { 
                        active: true, 
                        done: newDoneState 
                    };
                } 
                else {
                    return { 
                        active: false, 
                        done: newDoneState 
                    };
                }
            });

            setProgressState(newProgressState);

            return newFormIndex;
        });
    }

    const priceList = getPriceList(
        {
            navigate,
            callbacks: [
                () => {
                    updateOrderData("package", 1);
                },
                () => {
                    updateOrderData("package", 2);
                },
                () => {
                    updateOrderData("package", 3);
                }
            ]
        }
    );

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onloadend = () => updateOrderData("image", reader.result as string);
            reader.readAsDataURL(file);

            if (isDrag) setIsDrag(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        handleFile(file);
    };

    return (
        <section 
            className="relative w-screen grow overflow-hidden flex flex-col items-center justify-start"
            {...props}
        >
            <div className="z-10 flex items-center justify-center overflow-hidden w-full px-8 py-5 bg-zinc-900 border-b-2 border-t-2 border-zinc-800/50">
                <Div 
                    className="w-full h-full flex items-center justify-center" 
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className="gap-0 md:gap-6 flex flex-row items-center justify-between max-w-[1400px] w-full transition-all duration-200 ease-out">
                        <OrderStepCard 
                            iconActive={<Brush {...iconActiveProps} />}
                            iconNotActive={<Brush {...iconNotActiveProps} />}
                            title="Pilih Paket"
                            active={progressState[0].active}
                            done={progressState[0].done}
                            textClassName="hidden md:flex"
                        />
                        <ProgressPath progress={progressState[1].active ? 100 : 0} />
                        <OrderStepCard 
                            iconActive={<UserRound {...iconActiveProps} />}
                            iconNotActive={<UserRound {...iconNotActiveProps} />}
                            title="Data Diri"
                            active={progressState[1].active}
                            done={progressState[1].done}
                            textClassName="hidden md:flex"
                        />
                        <ProgressPath progress={progressState[2].active ? 100 : 0} />
                        <OrderStepCard 
                            iconActive={<CreditCard {...iconActiveProps} />}
                            iconNotActive={<CreditCard {...iconNotActiveProps} />}
                            title="Pembayaran"
                            active={progressState[2].active}
                            done={progressState[2].done}
                            textClassName="hidden md:flex"
                        />
                    </div>
                </Div>
            </div>
            <div className="w-screen grow flex items-center justify-center px-8 py-16">
                <Div className="flex items-center justify-center w-screen h-fit">
                    <div className="flex flex-col items-center justify-center gap-10 max-w-[1400px] w-full h-fit">
                        {formIndex === 1 ? (
                            <div className="flex flex-wrap items-center justify-center gap-4 px-8 w-full h-fit">
                                {priceList.map((priceData, index) => {
                                    return (
                                        <PriceCard 
                                            key={index}
                                            className={`${orderData.package !== index + 1 && orderData.package !== null ? "opacity-[0.5]" : "opacity-[1]"}`}
                                            {...priceData} 
                                        />
                                    )
                                })}
                            </div>
                        ) : formIndex === 2 ? (
                            <div className="flex flex-col items-center justify-center gap-4 w-full h-fit">
                                <div className="flex items-center justify-center gap-4 shrink-0 w-full flex-col md:flex-row">
                                    <Input 
                                        placeholder="Nama Lengkap (Contoh: John Doe)"
                                        className="flex-1 w-full md:basis-[1/2]"
                                        value={orderData.user.name}
                                        onChange={(e) => updateUserData("name", e.target.value)}
                                        icon={<UserRound {...inputIconProps} />}
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-4 shrink-0 w-full flex-col md:flex-row">
                                    <Input 
                                        placeholder="Email (Contoh: john.doe@gmail.com)"
                                        className="flex-1 w-full md:basis-[1/2]"
                                        value={orderData.user.email}
                                        onChange={(e) => updateUserData("email", e.target.value)}
                                        icon={<Mail {...inputIconProps} />}
                                    />
                                    <Input 
                                        placeholder="Nomor Telepon (Contoh: 081122223333)"
                                        className="flex-1 w-full md:basis-[1/2]"
                                        value={orderData.user.phone}
                                        onChange={(e) => updateUserData("phone", e.target.value)}
                                        icon={<Phone {...inputIconProps} />}
                                    />
                                </div>
                                <Input 
                                    placeholder="Catatan"
                                    className="flex-1 w-full md:basis-[1/2] items-start"
                                    value={orderData.notes}
                                    onChange={(e) => updateOrderData("notes", e.target.value)}
                                    inputStyle={{ height: "160px" }}
                                    inputClassName="resize-none overflow-y-auto"
                                    inputType="textarea"
                                    icon={<NotebookPen {...inputIconProps} />}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-6 w-full h-fit px-8">
                                <div className="w-full rounded-lg bg-zinc-800/50 border-2 border-zinc-700/50 p-7 max-w-[1024px] flex flex-col items-center justify-center gap-6">
                                    <h1 className="roboto-medium text-xl text-center text-zinc-100 leading-none">Data Pesanan</h1>
                                    <span className="w-full rounded-full bg-zinc-400/50 h-[1px]"></span>
                                    <span className="w-full h-fit flex flex-col items-center justify-start gap-8">
                                        <span className="w-full h-fit flex flex-col md:flex-row items-start justify-center gap-8 flex-wrap">
                                            {[
                                                {
                                                    title: "Paket",
                                                    value: `Paket ${orderData.package} (${priceList[(orderData.package || 1) - 1].title})`
                                                },
                                                {
                                                    title: "Nama Lengkap",
                                                    value: orderData.user.name
                                                },
                                                {
                                                    title: "Email",
                                                    value: orderData.user.email
                                                },
                                                {
                                                    title: "Nomor Telepon",
                                                    value: orderData.user.phone
                                                }
                                            ].map(data => {
                                                return (
                                                    <span className="flex flex-col items-start justify-center gap-3 basis-[1/4] w-full flex-1">
                                                        <h1 className="roboto-medium text-md text-zinc-100 leading-none">{data.title}</h1>
                                                        <p className="roboto-regular text-md text-zinc-100 whitespace-wrap">{data.value}</p>
                                                    </span>
                                                )
                                            })}
                                        </span>
                                        <span className="flex flex-col items-start justify-center gap-3 w-full">
                                            <h1 className="roboto-medium text-md text-zinc-100 leading-none">Catatan</h1>
                                            <span className="w-full h-fit flex flex-col items-start justify-start">
                                                {orderData.notes.split("\n").map(noteLine => {
                                                    return (
                                                        <p className="roboto-regular text-md text-zinc-100 whitespace-wrap w-full">{noteLine}</p>
                                                    )
                                                })}
                                            </span>
                                        </span>
                                        <span className="flex p-4 bg-zinc-800 border-2 border-zinc-700/50 rounded-md items-center justify-between gap-8 w-full">
                                            <h4 className="roboto-medium text-md text-zinc-100 leading-none">Total harga</h4>
                                            <h5 className="roboto-regular text-md text-zinc-100 leading-none">Rp {new Intl.NumberFormat("id-ID").format(priceList[(orderData.package || 1) - 1].discount)}</h5>
                                        </span>
                                    </span>
                                </div>
                                <div className="w-full rounded-lg bg-zinc-800/50 border-2 border-zinc-700/50 p-7 max-w-[1024px] flex flex-col items-center justify-center gap-6">
                                    <h1 className="roboto-medium text-xl text-center text-zinc-100 leading-none">Metode Pembayaran</h1>
                                    <span className="w-full rounded-full bg-zinc-400/50 h-[1px]"></span>
                                    <span className="w-full h-fit flex flex-col items-center justify-start gap-8">
                                        <span className="w-full h-fit flex flex-col md:flex-row items-start justify-center gap-8 flex-wrap">
                                            {[
                                                { 
                                                    title: "BSI",  
                                                    value: "7234578912" 
                                                },
                                                { 
                                                    title: "Dana", 
                                                    value: "081234567890"   
                                                },
                                                { 
                                                    title: "GoPay", 
                                                    value: "081298765432"  
                                                },
                                                { 
                                                    title: "OVO", 
                                                    value: "081212345678" 
                                                }
                                            ].map(data => {
                                                return (
                                                    <span className="flex flex-col items-start justify-center gap-3 basis-[1/4] w-full flex-1">
                                                        <h1 className="roboto-medium text-md text-zinc-100 leading-none">{data.title}</h1>
                                                        <p className="roboto-regular text-md text-zinc-100 whitespace-wrap">{data.value}</p>
                                                    </span>
                                                )
                                            })}
                                        </span>
                                    </span>
                                </div>
                                <div 
                                    className="relative overflow-hidden w-full rounded-lg bg-zinc-800/50 border-2 p-6 border-zinc-700/50 max-w-[1024px] h-screen max-h-120 flex items-center justify-center"
                                    onClick={handleClick}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={handleDrop}
                                    onDragEnter={!isDrag ? () => setIsDrag(true) : () => {}}
                                    onDragExit={isDrag ? () => setIsDrag(false) : () => {}}
                                >
                                    {isDrag && (
                                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none p-6">
                                            <span className="flex flex-col items-center justify-center w-fit h-fit gap-2 border-2 bg-zinc-800/75 backdrop-blur-sm backdrop-brightness-[75%] border-amber-700 border-dashed w-full h-full rounded-lg">
                                                <Image 
                                                    color="var(--color-zinc-500)"
                                                    className="size-24"
                                                    strokeWidth={0.8}
                                                />
                                                <h1 className="roboto-regular text-center text-md text-zinc-400 whitespace-wrap select-none">Telusuri atau seret dan letakkan foto bukti pembayaran</h1>
                                            </span>
                                        </div>
                                    )}
                                    {orderData.image ? (
                                        <img
                                            src={orderData.image}
                                            alt="Preview"
                                            className="h-full w-full pointer-events-none overflow-hidden object-cover object-top rounded-lg flex items-center justify-center border-2 border-zinc-700/50"
                                        />
                                    ) : (
                                        <span className={`flex flex-col items-center justify-center w-fit h-fit gap-2 pointer-events-none w-full h-full rounded-lg`}>
                                            <Image 
                                                color="var(--color-zinc-700)"
                                                className="size-24"
                                                strokeWidth={0.8}
                                            />
                                            <h1 className="roboto-regular text-center text-md text-zinc-600 whitespace-wrap select-none">Telusuri atau seret dan letakkan foto bukti pembayaran</h1>
                                        </span>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="hidden" 
                                        ref={fileInputRef}
                                        onChange={(event) => {
                                            if (event.target.files && event.target.files[0]) handleFile(event.target.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-center max-w-[1024px] w-full gap-4 px-8">
                            {
                                [
                                    {
                                        title: "Sebelumnya",
                                        callback: validateInput(formIndex, "prev") ? () => changeFormIndex("prev") : () => {},
                                        className: `${!validateInput(formIndex, "prev") ? "opacity-[0.5] pointer-events-none" : "opacity-[1]"}`
                                    },
                                    {
                                        title: `${formIndex < 3 ? "Selanjutnya" : "Kirim"}`,
                                        callback: validateInput(formIndex, "next") && formIndex < 3 ? () => changeFormIndex("next") : async () => {
                                            await sendEmail(orderData);
                                            setOpenPopup(true);
                                        },
                                        className: `${!validateInput(formIndex, "next") ? "opacity-[0.5] pointer-events-none" : "opacity-[1]"}`
                                    }
                                ].map(button => {
                                return (
                                    <button 
                                        className={`relative flex items-center justify-center overflow-hidden rounded-full px-6 py-3 bg-amber-700 border-2 border-amber-600/50 max-w-60 w-full ${button.className}`}
                                        onClick={button.callback}
                                    >
                                        <p className="z-1 roboto-regular text-zinc-100 text-md text-center leading-none pointer-events-none">{button.title}</p>
                                        <span className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-amber-600 to-transparent opacity-[0.25] hover:opacity-[0.75] transition-[opacity] duration-200 ease-out"></span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </Div>
            </div>
            {
                openPopup && (
                    <OrderPopup onClick={() => {
                        setOpenPopup(false);
                        navigate("/");
                    }} />
                )
            }
        </section>
    )
}