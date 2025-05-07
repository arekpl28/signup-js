import { getRestaurantForCurrentUser } from "@/actions/restaurantServer";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantForm from "./RestaurantForm";
import { extractLocale } from "@/lib/locale";
import initTranslations from "@/app/i18n";

export default async function RestaurantPage(props) {
  const restaurant = await getRestaurantForCurrentUser();
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("your_restaurant")}
        </h1>

        {restaurant ? (
          <RestaurantInfo data={restaurant} />
        ) : (
          <>
            <div className="text-center text-sm mb-4">
              {t("no_restaurant_yet_fill_in_details_to_create")}
            </div>
            <RestaurantForm />
          </>
        )}
      </section>
    </div>
  );
}
