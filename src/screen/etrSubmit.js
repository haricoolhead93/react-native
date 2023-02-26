import { View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatusCard from "../components/reusable/StatusCard";
import Listing from "../components/reusable/Listing";
import { etrSubmittedListColumn } from "../util/TableHeaderColumn";
import { useSelector } from "react-redux";
import { isDesktop } from "react-device-detect";
import ListingFLatList from "../components/reusable/ListingFLatList";

export default function etrSubmit() {
  const { infoStatus, infoData } = useSelector((state) => state.info);
  let status = infoStatus;
  const infoIcon = (
    <MaterialCommunityIcons
      name="information-outline"
      size={18}
      color="black"
    />
  );
  let columns = etrSubmittedListColumn;
  let data = infoData; //sample data
  let casesTotal = 55;
  return (
    <View>
      <StatusCard
        status={status}
        statusTypeWeb="eTR Submitted"
        statusTypeMobile="eTR Listing"
        total={"Total Cases: " + casesTotal}
      />
      {/* Listing */}
      {isDesktop ? (
        <Listing
          listingType="eTrade Reference Listing"
          columns={columns}
          data={data}
        />
      ) : (
        <ListingFLatList data={data} />
      )}
    </View>
  );
}
