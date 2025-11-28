// Dữ liệu câu hỏi - Đề thi Điện Toán Đám Mây
const quizData = [
    {
        question: "You ONLY want to manage Applications and Data. Which type of Cloud Computing model should you use? (Bạn chỉ muốn quản lý App và dữ liệu. Loại model cloud nào là được nên sử dụng)",
        options: [
            "On-premises",
            "Infrastructure as a Services (IaaS)",
            "Software as a Services (SaaS)",
            "Platform as a Services"
        ],
        correct: 3
    },
    {
        question: "What is the pricing model of Cloud Computing? (Đâu là mô hình tính phí cho Cloud computing)",
        options: [
            "Discounts over time",
            "Pay-as-you-go pricing",
            "Pay once a year",
            "Flat-rate pricing"
        ],
        correct: 1
    },
    {
        question: "Which Global Infrastructure identity is composed of one or more discrete data centers with redundant power, networking, and connectivity, and are used to deploy infrastructure? (Mô hình Infra nào là nơi chứa một hoặc nhiều trung tâm dữ liệu với điện, mạng và kết nối để hình để deploy)",
        options: [
            "Edge Locations",
            "Availability Zones",
            "Regions",
            "Local"
        ],
        correct: 1
    },
    {
        question: "Which of the following is NOT one of the Five Characteristics of Cloud Computing? (Cái nào là không phải là một trong 4 đặc tính của cloud computing)",
        options: [
            "Rapid elasticity and scalability",
            "Multi-tenancy and resource pooling",
            "Dedicated Support Agent to help you deploy applications",
            "On-demand self service"
        ],
        correct: 2
    },
    {
        question: "Which are the 3 pricing Fundamentals of the AWS Cloud? (3 nguyên tắc cơ bản về giá của Đám mây AWS là gì?)",
        options: [
            "Compute, Storage, and Data transfer in the AWS Cloud",
            "Compute, Networking, and Data transfer out of the AWS Cloud",
            "Compute, Storage, and Data transfer out of the AWS Cloud",
            "Storage, Functions, and Data transfer in the AWS Cloud"
        ],
        correct: 2
    },
    {
        question: "Which of the following options is NOT a point of consideration when choosing an AWS Region? (Tùy chọn nào sau đây KHÔNG phải là điểm cần cân nhắc khi chọn Khu vực AWS?)",
        options: [
            "Compliance with data governance",
            "Latency",
            "Capacity availability",
            "Pricing"
        ],
        correct: 3
    },
    {
        question: "AWS Regions are composed of? (Khu vực AWS bao gồm?)",
        options: [
            "Two or more Edge Locations",
            "One or more discrete data centers",
            "Three or more Availability Zones"
        ],
        correct: 2
    },
    {
        question: "Which of the following services has a global scope? (Dịch vụ nào sau đây có phạm vi toàn cầu?)",
        options: [
            "EC2",
            "IAM",
            "Lambda",
            "Rekognition"
        ],
        correct: 1
    },
    {
        question: "Which of the following is the definition of Cloud Computing? (Điều nào sau đây là định nghĩa về Điện toán đám mây?)",
        options: [
            "Rapidly develop, test and launch software applications.",
            "Automatic and quick ability to acquire resources as you need them and release resources when you no longer need them.",
            "On-demand availability of computer system resources, especially data storage (cloud storage) and computing power, without direct active management by the user",
            "Change resource types when needed"
        ],
        correct: 2
    },
    {
        question: "What defines the distribution of responsibilities for security in the AWS Cloud? (Điều gì xác định sự phân bố trách nhiệm bảo mật trên Đám mây AWS?)",
        options: [
            "AWS Pricing Fundamentals",
            "The Shared Responsibility Model",
            "AWS Acceptable Use Policy",
            "The AWS Management Console"
        ],
        correct: 1
    },
    {
        question: "A company would like to benefit from the advantages of the Public Cloud but would like to keep sensitive assets in its own infrastructure. Which deployment model should the company use? (Một công ty muốn hưởng lợi từ những lợi thế của Đám mây công cộng nhưng muốn giữ các tài sản nhạy cảm trong cơ sở hạ tầng của riêng mình. Công ty nên sử dụng mô hình triển khai nào?)",
        options: [
            "Private Cloud",
            "Public Cloud",
            "Hybrid Cloud"
        ],
        correct: 2
    },
    {
        question: "What is NOT authorized to do on AWS according to the AWS Acceptable Use Policy? (Những gì KHÔNG được phép thực hiện trên AWS theo Chính sách sử dụng được chấp nhận của AWS?)",
        options: [
            "Building a gaming application",
            "Deploying a website",
            "Run analytics on stolen content",
            "Backup your data"
        ],
        correct: 2
    },
    {
        question: "What is a proper definition of IAM Roles? (Định nghĩa đúng về Vai trò IAM là gì?)",
        options: [
            "An IAM entity that defines a set of permissions for making AWS service requests, that will be used by AWS services",
            "IAM Users in multiple Groups",
            "A password policy",
            "Permissions assigned to Users to perform actions"
        ],
        correct: 0
    },
    {
        question: "Which answer is INCORRECT regarding IAM Users? (Câu trả lời nào KHÔNG ĐÚNG đối với Người dùng IAM?)",
        options: [
            "IAM Users can belong to multiple groups",
            "IAM Users don't have to belong to a group",
            "IAM Users can have policies assigned to them",
            "IAM Users access AWS with the root account credentials"
        ],
        correct: 3
    },
    {
        question: "Which of the following is an IAM best practice? (Cách nào sau đây là phương pháp thực hành tốt nhất của IAM?)",
        options: [
            "Don't use the root user account",
            "Create several users for a physical person",
            "Share credentials so a colleague can perform a task for you",
            "Do not enable MFA for easier access"
        ],
        correct: 0
    },
    {
        question: "What are IAM Policies? (Chính sách IAM là gì?)",
        options: [
            "AWS services performable actions",
            "JSON documents to define Users, Groups or Roles' permissions",
            "Rules to set up a password for IAM Users",
            "Restrict root account permissions"
        ],
        correct: 1
    },
    {
        question: "Which principle should you apply regarding IAM Permissions? (Bạn nên áp dụng nguyên tắc nào liên quan đến Quyền IAM?)",
        options: [
            "Grant most privilege",
            "Grant least privilege",
            "Grant permissions if your employee asks you to",
            "Restrict root account permissions"
        ],
        correct: 1
    },
    {
        question: "Which EC2 Purchasing Option can provide the biggest discount, but is not suitable for critical jobs or databases? (Tùy chọn mua EC2 nào có thể mang lại mức chiết khấu lớn nhất nhưng không phù hợp với các công việc hoặc cơ sở dữ liệu quan trọng?)",
        options: [
            "Reserved Instances",
            "Convertible Instances",
            "Dedicated Hosts",
            "Spot Instances"
        ],
        correct: 3
    },
    {
        question: "Which network security tool can you use to control traffic in and out of EC2 Instances? (Bạn có thể sử dụng công cụ bảo mật mạng nào để kiểm soát lưu lượng vào và ra Phiên bản EC2?)",
        options: [
            "Network Access Control List (NACL)",
            "Identity and Management Access (IAM)",
            "GuardDuty",
            "Security Groups"
        ],
        correct: 3
    },
    {
        question: "Which of the following is NOT an EC2 Instance Purchasing Option? (Lựa chọn nào sau đây KHÔNG phải là Tùy chọn mua phiên bản EC2?)",
        options: [
            "Spot Instances",
            "Reserved Instances",
            "On-demand Instances",
            "Connect Instances"
        ],
        correct: 3
    },
    {
        question: "Which EC2 Purchasing Option should you use for an application you plan on running on a server continuously for 1 year? (Bạn nên sử dụng Tùy chọn mua EC2 nào cho ứng dụng bạn định chạy trên máy chủ liên tục trong 1 năm?)",
        options: [
            "Reserved Instances",
            "Spot Instances",
            "On-demand Instances",
            "Convertible Instances"
        ],
        correct: 0
    },
    {
        question: "Where are objects stored in Amazon S3? (Các đối tượng được lưu trữ trong Amazon S3 ở đâu?)",
        options: [
            "Folders",
            "Buckets",
            "Files",
            "Bin"
        ],
        correct: 1
    },
    {
        question: "How do you get charged in AWS Lambda? (Bạn bị tính phí như thế nào trong AWS Lambda?)",
        options: [
            "Per programming language",
            "Per number of functions",
            "Per call and per duration",
            "Per inactive time"
        ],
        correct: 2
    },
    {
        question: "How would you best describe \"event-driven\" in AWS Lambda? (Bạn mô tả chính xác nhất \"theo sự kiện\" trong AWS Lambda như thế nào?)",
        options: [
            "Happens on a certain day",
            "Happens at a certain time",
            "Happens on a regular basis",
            "Happens when needed"
        ],
        correct: 3
    },
    {
        question: "Which of the following statements is INCORRECT regarding the definition of the term \"serverless\"? (Câu nào sau đây KHÔNG ĐÚNG về định nghĩa của thuật ngữ \"serverless\"?)",
        options: [
            "Serverless allows you to deploy functions as a service",
            "There are no servers",
            "You don't need to manage servers",
            "Lambda is the serverless pioneer"
        ],
        correct: 1
    },
    {
        question: "Which of the following statements is NOT a feature of AWS Lambda? (Câu nào sau đây KHÔNG phải là tính năng của AWS Lambda?)",
        options: [
            "Integration with the whole AWS suite of services",
            "Virtual functions",
            "Automated and continuous scaling",
            "Definition of a minimum and a maximum of EC2 Instances running"
        ],
        correct: 3
    },
    {
        question: "Which AWS serverless service can be used by developers to create APIs? (Nhà phát triển có thể sử dụng dịch vụ serverless nào của AWS để tạo API?)",
        options: [
            "ECR",
            "Lambda",
            "API gateway"
        ],
        correct: 2
    },
    {
        question: "Which relational database is a proprietary technology from AWS and is cloud-optimized? (Cơ sở dữ liệu quan hệ nào là công nghệ độc quyền của AWS và được tối ưu hóa cho đám mây?)",
        options: [
            "DynamoDB",
            "Oracle",
            "Athena",
            "Aurora"
        ],
        correct: 3
    },
    {
        question: "What is the main purpose of High Availability in the Cloud? (Mục đích chính của Tính sẵn sàng cao trong Đám mây là gì?)",
        options: [
            "Increase scalability",
            "Application thriving even in case of a disaster",
            "Access on computers and smartphones",
            "Handle greater loads by launching EC2 instances based on the demand"
        ],
        correct: 1
    },
    {
        question: "Which of the following statements is NOT a feature of Load Balancers? (Câu nào sau đây KHÔNG phải là tính năng của Cân bằng tải?)",
        options: [
            "Do regular health checks to your instances",
            "Spread load across multiple downstream instances",
            "Handle failures of downstream instances",
            "Back-end autoscaling"
        ],
        correct: 3
    }
];
