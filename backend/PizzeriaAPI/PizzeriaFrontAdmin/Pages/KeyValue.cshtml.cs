using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json.Linq;
using PizzeriaAPI.Dto;
using PizzeriaFrontAdmin.Models;

namespace PizzeriaFrontAdmin.Pages
{
    public class KeyValueModel : PizzeriaPageModel
    {
        public List<KeyValueDto> KeyValueList { get; set; } = new List<KeyValueDto>();
        public KeyValueDto NewValue { get; set; } = new KeyValueDto { Id = -1, Key = "", Value = "" };
        public async override Task OnAsyncGet()
        {
            await base.OnAsyncGet();
            Title = "Key-Value";
            GetKeyValueList();

        }

        private async void GetKeyValueList()
        {
            JArray response = (JArray)await base.MakeHttpRequest(HttpMethod.Get, "/GetAllKeyValueList");
            foreach (JObject item in response)
            {
                KeyValueList.Add(new KeyValueDto
                {
                    Id = Int32.Parse(item.GetValue("Id").ToString()),
                    Key = item.GetValue("Key").ToString(),
                    Value = item.GetValue("Value").ToString(),
                });
            }
        }

    }
}
