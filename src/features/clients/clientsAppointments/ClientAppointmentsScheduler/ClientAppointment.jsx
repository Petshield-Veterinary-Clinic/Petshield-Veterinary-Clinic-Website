import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";

class ClientAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const {
      data,
      setAppointmentVisible,
      onAppointmentMetaChange,
      notificationState,
      setNotificationState,
    } = this.props;
    if (notificationState) {
      const { appointment } = notificationState;

      if (Array.isArray(appointment)) {
        if (appointment[0].ID === data.id) {
          setAppointmentVisible(true);
          onAppointmentMetaChange({
            target: this.ref.current.parentElement.parentElement,
            data,
          });
          setNotificationState(null);
        }
      } else {
        if (appointment.ID === data.id) {
          setAppointmentVisible(true);
          onAppointmentMetaChange({
            target: this.ref.current.parentElement.parentElement,
            data,
          });
          setNotificationState(null);
        }
      }
    }
  }

  render() {
    const {
      data,
      onClick,
      classes,
      setAppointmentVisible,
      onAppointmentMetaChange,
      location,
      ...restProps
    } = this.props;

    return (
      <Appointments.Appointment
        ref={this.ref}
        onClick={({ target }) => {
          setAppointmentVisible(true);
          onAppointmentMetaChange({
            target: target.parentElement.parentElement,
            data,
          });
        }}
        {...restProps}
      >
        <div ref={this.ref}>{restProps.children}</div>
      </Appointments.Appointment>
    );
  }
}

export default ClientAppointment;
// export const ClientAppointment = ({
//   data,
//   onClick,
//   classes,
//   setAppointmentVisible,
//   onAppointmentMetaChange,
//   location,
//   ...restProps
// }) => {
//   useEffect(() => {}, [
//     location,
//     data,
//     setAppointmentVisible,
//     onAppointmentMetaChange,
//   ]);

//   return (
//     <Appointments.Appointment
//       onClick={({ target }) => {
//         setAppointmentVisible(true);
//         onAppointmentMetaChange({
//           target: target.parentElement.parentElement,
//           data,
//         });
//       }}
//       {...restProps}
//     />
//   );
// };
