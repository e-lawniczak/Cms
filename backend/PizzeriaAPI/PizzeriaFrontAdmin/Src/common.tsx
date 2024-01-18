import * as Axios from 'axios';

export const baseApiUrl = "https://localhost:7156";
export const axiosBaseConfig = {
    headers: {
        'Bearer': getCookie("token"),
    }
}

export const testFunc = () => {
    console.log("działasswss");
}



export const callApi = (method: "GET" | "POST" | "PATCH" | "DELETE", url: string, data: any) => {
    const callUrl = "https://localhost:7156" + url;

    let axiosObj = {
        method: method,
        url: callUrl,
    } as any;
    if (data != null)
        axiosObj.data = data;

}

export function getCookie(cname:any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }