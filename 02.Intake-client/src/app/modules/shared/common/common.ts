//import { ComplainStatus } from "../../../proxy/cmsenums";

export class Common {

  public static readonly defaultDateFormat = 'DD/MM/YYYY';
  public static readonly responseDateFormat = 'YYYY-MM-DD';

  public static GetDeleteModalConfigurationObject(name: string): any {
    return {
      title: 'Delete Confirmation',
      body: 'Are you sure you want to delete <b>\"' + name + '\" ?</b><p class="text-danger">This action cannot be undone!!</p>',
      okButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    };
  }

  public static ParseDateForUI(inputDate: string): string {
    return (
      new Date(inputDate).getDate() +
      '/' +
      (new Date(inputDate).getMonth() + 1) +
      '/' +
      new Date(inputDate).getFullYear()
    );
  }

  public static maskCharacter(anyStr: any, showNo: number) {
    if (anyStr) {
      var mask = '';
      for (let i = 1; i <= anyStr.length; i++) {
        mask += "*";
      }
      //console.log(mask + anyStr.slice((anyStr.length - showNo), anyStr.length));
      return mask + anyStr.slice((anyStr.length - showNo), anyStr.length);
    }
  }

  public static quarters = [
    { "id": 1, "name": "Quarter One" },
    { "id": 2, "name": "Quarter Two" },
    { "id": 3, "name": "Quarter Three" }
  ];

  public static buildings = [
    { "id": 1, "quarterId": 1, "name": "Building 1" },
    { "id": 2, "quarterId": 1, "name": "Building 2" },
    { "id": 3, "quarterId": 1, "name": "Building 3" },
    { "id": 4, "quarterId": 2, "name": "Building 4" },
    { "id": 5, "quarterId": 2, "name": "Building 5" },
    { "id": 6, "quarterId": 2, "name": "Building 6" }
  ];

  //public static complainStatus = [
  //  { "id": 0, "status": ComplainStatus.None, "name": "None" },
  //  { "id": 1, "status": ComplainStatus.New, "name": "New" },
  //  //{ "id": 2, "status": ComplainStatus.Seen, "name": "Seen" },
  //  { "id": 2, "status": ComplainStatus.SiteVisit, "name": "Site Visit" },
  //  { "id": 3, "status": ComplainStatus.InProgress, "name": "In Progress" },
  //  { "id": 4, "status": ComplainStatus.Complete, "name": "Complete" },
  //  { "id": 5, "status": ComplainStatus.TenantFeedback, "name": "Allotee Feedback" },
  //  { "id": 6, "status": ComplainStatus.Cancel, "name": "Cancel" },
  //]

}


