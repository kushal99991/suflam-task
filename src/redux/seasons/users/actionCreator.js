import actions from "./actions";

import { message } from "antd";
import { DataService } from "config/dataService/dataService";
import { API } from "config/api/index";

const { getSeason } = actions;

const getProductData = (search,filters) => {
  return async (dispatch) => {
    try {
      let res;
      if (!filters) {
        res = await DataService.get(API.product.get + `filter[include]=productbrand&filter[include]=productmedia&filter[include]=category&filter[where][productstatus]=1&filter[where][name][like]=%${search}%`);
      } else {
        res = await DataService.get(API.product.get + `filter[include]=productbrand&filter[include]=productmedia&filter[include]=category&filter[where][productstatus]=1&filter[where][name][like]=%${search}%&filter[order][0]=${filters}`);

      }
      if (!res.data.error) {
        console.log("product data=", res)
        dispatch(getSeason(res.data));
        // window.location.reload();
        return res;
      } else {
        return res;
      }
      // console.log(" hello user", payload);
    } catch (err) {
      return err;
      //  dispatch(loginErr(err));
    }
  };
};


export { getProductData };
