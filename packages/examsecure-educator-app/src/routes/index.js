import SignIn from '../authentication/SignIn.js';
import SignUp from '../authentication/SignUp.js';
import AddData from '../components/addData/flaggedData/add_data'
import AdminHome from '../components/admin_home.js'
import ProctorPage from '../components/proctor/proctor_page.js';
import DisqualifiedUsers from '../components/disqualified/disqualified_page.js';
import ImageDetail from '../components/proctor/image_detail.js';
import StudentPage from '../components/students/student_page'
import AddQuestions from '../components/addData/questions/add_questions'

const routes = [
    {
        path: '/',
        component: AdminHome,
        title: 'Admin Home'
    },
    {
        path: '/signin',
        component: SignIn,
        title: 'Sign In'
    },
    {
        path: '/signup',
        component: SignUp,
        title: 'Sign Up'
    },
    // {
    //     path: '/adddata',
    //     component: AddData,
    //     title: 'Add Data'
    // },
    {
        path: '/proctorpage',
        component: ProctorPage,
        title: 'Proctor Page'
    },
    {
        path: '/disqualifiedusers',
        component: DisqualifiedUsers,
        title: 'Disqualified Users'
    },
    {
        path: '/imagedetail/:testnumber/:id',
        component: ImageDetail,
        title: 'Details of Triggered User'
    },
    {
        path: '/studentpage',
        component: StudentPage,
        title: 'Student Details Page'
    },
    {
        path: '/addquestions',
        component: AddQuestions,
        title: 'Adding Questions'
    },
    // {
    //     path: '/trial',
    //     component: Trial,
    //     title: 'Trial'
    // }
];

export default routes;