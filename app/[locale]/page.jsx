import MenuList from "@/components/menu/MenuList";
import { getAllActiveRestaurants } from "@/actions/restaurantServer";
import RestaurantList from "@/components/restaurant/RestaurantList";
import { extractLocale } from "@/lib/locale";
import initTranslations from "../i18n";

export default async function Home(props) {
  const restaurants = await getAllActiveRestaurants();
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("restaurants")}</h1>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
