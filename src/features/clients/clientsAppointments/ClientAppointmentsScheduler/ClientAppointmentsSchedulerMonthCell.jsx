import { MonthView } from "@devexpress/dx-react-scheduler-material-ui";
import { showModal } from "../../../modals/modalSlice";
import { useDispatch } from "react-redux";

export const MonthCell = (props) => {
  const dispatch = useDispatch();

  const handleOnCellPressed = () => {
    dispatch(
      showModal({
        modalType: "ADD_APPOINTMENT_MODAL",
        modalProps: {
          startDate: String(props.startDate),
        },
      })
    );
  };

  return <MonthView.TimeTableCell onClick={handleOnCellPressed} {...props} />;
};
