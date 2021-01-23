import { ClientAppointmentsScheduler } from "./ClientAppointmentsScheduler";
import { useSelector } from "react-redux";
import moment from "moment";

const ClientAppointmentsSchedulerContainer = () => {
  const { appointments } = useSelector((state) => state.clients);
  const data = appointments.map((ap) => {
    return {
      id: ap.ID,
      startDate: new Date(ap.date),
      endDate: moment(new Date(ap.date)).add(2, "hours").toDate(),
      title: `${ap.client.clientName} - ${ap.client.pet.petName} : ${ap.type}`,
      client: ap.client,
      appointment: ap,
    };
  });

  return <ClientAppointmentsScheduler data={data} />;
};
export default ClientAppointmentsSchedulerContainer;
