import React from "react";
import { useQuery } from "@tanstack/react-query";
import NotificationCard from "./NotificationCard";
import NotificationsHeader from "./NotificationsHeader";
import { getNotifications } from "../utlis/https";
import LoaderComponent from "./LoaderComponent";


const Notifications = () => {
  const token = localStorage.getItem("authToken");
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications({ token }),
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-center text-red-600">
         {error}
        </p>
      </div>
    );
  }

  const getNotificationDate = (createdAt) => {
    const today = new Date();
    const notificationDate = new Date(createdAt);

    const diffInTime = today.getTime() - notificationDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays === 0) {
      return "اليوم";
    } else if (diffInDays === 1) {
      return "أمس";
    } else {
      return notificationDate.toLocaleDateString("ar-EG");
    }
  };

  return (
    <section className="p-4">
      <NotificationsHeader />
      <div >
        {data?.map((notification) => (
          <div key={notification.id}>
            <h5 className="text-md font-bold text-gray-800 mb-4 text-right">
              {getNotificationDate(notification.created_at)}
            </h5>
            <NotificationCard
              TransactionTitle={notification.title}
              type={notification.type}
              TransactionDetail={notification.body}
            />
          </div>
        ))}

        {!data?.length && (
          <p className="text-right text-gray-500">لا توجد إشعارات حالياً.</p>
        )}
      </div>
    </section>
  );
};

export default Notifications;
