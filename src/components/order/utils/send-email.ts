import emailjs from "emailjs-com";
import { getDateTime } from "./date-generator";
import { generateOrderId } from "./unique-id";
import { type OrderDataProps } from "../order-section";
import priceList from "../../data/pricelist.json";

export async function sendEmail (orderData: OrderDataProps) {
    const dateTime = getDateTime();
    const orderId = await generateOrderId();
    const priceData = priceList[(orderData.package || 1) - 1];
    const templateParams = {
        dateTime,
        orderId,
        name: orderData.user.name,
        email: orderData.user.email,
        phone: orderData.user.phone,
        package: orderData.package,
        price: new Intl.NumberFormat("id-ID").format(priceData.discount),
        title: priceData.title,
        description: priceData.description,
        notes: orderData.notes,
        attachment: orderData.image
    };

    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
}