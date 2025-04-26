import { getRestaurantForCurrentUser } from "@/actions/restaurantServer";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantFormField from "./RestaurantFormField";

export default async function RestaurantPage() {
  const restaurant = await getRestaurantForCurrentUser();

  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Twoja restauracja
        </h1>

        {restaurant ? (
          <RestaurantInfo data={restaurant} />
        ) : (
          <>
            <div className="text-center text-sm mb-4">
              Nie masz jeszcze dodanej restauracji. Wypełnij dane, aby ją
              stworzyć:
            </div>
            <RestaurantFormField />
          </>
        )}
      </section>
    </div>
  );
}
