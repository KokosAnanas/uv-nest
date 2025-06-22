export interface INotice {
    orgName:    string;
    noticeNum:  string;
    noticeDate: Date;
    toWhom:     string;
    copyTo:     string;
    specialist: string;
    present:    string;
    objectName: string;
    workType:   string;
    violations: INoticeViolation[];
    actions:    string;
    contacts:   string;
}

export interface INoticeViolation {
    place: string;
    element: string;
    subject: string;
    norm: string;
    deadline: Date;
    note: string;
}



//
//
//
//
// export interface INoticeClient {
//     name: string,
//     description: string,
//     noticeOperator: string,
//     price: string,
//     img: string,
// }