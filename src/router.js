import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'

import Home from '@/pages/Home/Home'
import Index from '@/pages/Home/Index'
import Resourcelist from '@/pages/Home/Resourcelist'
import Parkservice from '@/pages/Home/Parkservice'
import My from '@/pages/Home/My'

import Nutritionalmeals from '@/pages/Eat/Nutritionalmeals'
import Purcreport from '@/pages/Eat/Purcreport'
import EatShow from '@/pages/Eat/Show'

import ParkserviceAss from '@/pages/Parkservice/ParkserviceAss'
import ParkserviceAdmin from '@/pages/Parkservice/ParkserviceAdmin'
import Special from '@/pages/Parkservice/Special'
import GrowthFile from '@/pages/Parkservice/GrowthFile'
import GrowthFileShow from '@/pages/Parkservice/GrowthFileShow'

import Admissions from '@/pages/Admissions/Admissions'
import Admissions1 from '@/pages/Admissions/Admissions1'
import AdmissionsAdd from '@/pages/Admissions/Add'
import AdmissionsShow from '@/pages/Admissions/Show'
import AdmissionsList from '@/pages/Admissions/AdmissionsList'
import Resources from '@/pages/Resources'
import WorkLog from '@/pages/WorkLog/Index'
import WorkLogAdd from '@/pages/WorkLog/add'
import Logdetails from '@/pages/WorkLog/Logdetails'

import patrolGarden from '@/pages/patrolGarden/patrolGarden'
import patrolGardenAdd from '@/pages/patrolGarden/add'
import patrolGardenList from '@/pages/patrolGarden/list'
import patrolGardenShow from '@/pages/patrolGarden/show'

import Approval from '@/pages/My/Approval'
import ApprovalShow from '@/pages/My/ApprovalShow'
import Articlewages from '@/pages/My/Articlewages'
import Studentfile from '@/pages/My/Studentfile'
import Addthestudent from '@/pages/My/Addthestudent'

import Assess from '@/pages/Assess/Assess'
import Assessment from '@/pages/Assess/assessment'

import ParkManage from '@/pages/ParkManage/Index'
import Finance from '@/pages/ParkManage/Finance'
import ReserveFund from '@/pages/ParkManage/ReserveFund'
import Statistics from '@/pages/ParkManage/Statistics'
import IncomeDate from '@/pages/ParkManage/IncomeDate'
import ExpenditureData from '@/pages/ParkManage/ExpenditureData'
import Task from '@/pages/ParkManage/Task'
import Financial from '@/pages/ParkManage/financial'

import Teach from '@/pages/Teach/List'

import Describe from '@/pages/Home/Describe'

import Targetmanage from '@/pages/Home/Targetmanage'

import Teachbooks from '@/pages/Home/Teachbooks'

import Smartmoment from '@/pages/Home/Smartmoment'
import AddHomeproduced from '@/pages/Teach/AddHomeproduced'

import Homeproduced from '@/pages/Teach/Homeproduced'
import SettlementDetails from '@/pages/SpecialTeacher/SettlementDetails';
import CleverInstantaneous from '@/pages/SpecialTeacher/CleverInstantaneous';
import CheckWork from '@/pages/CheckWork/CheckWork'
import Pay from '@/pages/My/Pay'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            redirect: '/Home',
        }, {
            path: '/Home',
            name: "Home",
            redirect: '/Home/Index',
            component: Home,
            children: [{
                    path: 'Index',
                    name: 'Index',
                    component: Index
                },
                {
                    path: 'Parkservice',
                    name: 'Parkservice',
                    component: Parkservice
                },
                {
                    path: 'My',
                    name: 'My',
                    component: My
                },
                {
                    path: 'Resourcelist',
                    name: 'Resourcelist',
                    component: Resourcelist
                },
                {
                    path: 'Teachbooks',
                    name: "Teachbooks",
                    component: Teachbooks
                }
            ]
        },
        {
            path: '/Resources',
            name: 'Resources',
            component: Resources
        },
        {
            path: '/WorkLog',
            name: 'WorkLog',
            component: WorkLog
        },
        {
            path: '/WorkLogAdd',
            name: 'WorkLogAdd',
            component: WorkLogAdd
        },
        {
            path: '/Logdetails',
            name: 'Logdetails',
            component: Logdetails
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Admissions',
            name: 'Admissions',
            component: Admissions
        },
        {
            path: '/Admissions1',
            name: 'Admissions1',
            component: Admissions1
        },
        {
            path: '/AdmissionsShow',
            name: 'AdmissionsShow',
            component: AdmissionsShow
        },
        {
            path: '/AdmissionsAdd',
            name: 'AdmissionsAdd',
            component: AdmissionsAdd
        },
        {
            path: '/AdmissionsList',
            name: 'AdmissionsList',
            component: AdmissionsList
        },
        {
            path: '/Nutritionalmeals',
            name: 'Nutritionalmeals',
            component: Nutritionalmeals
        },
        {
            path: '/Purcreport',
            name: 'Purcreport',
            component: Purcreport
        }, {
            path: "/EatShow",
            name: "EatShow",
            component: EatShow
        }, {
            path: "/Assess",
            name: "Assess",
            component: Assess
        },, {
            path: "/assessment",
            name: "assessment",
            component: Assessment
        }, {
            path: "/Special",
            name: "Special",
            component: Special
        }, {
            path: "/GrowthFile",
            name: "GrowthFile",
            component: GrowthFile
        }, {
            path: "/GrowthFileShow",
            name: "GrowthFileShow",
            component: GrowthFileShow
        }, {
            path: "/ParkserviceAss",
            name: "ParkserviceAss",
            component: ParkserviceAss
        }, {
            path: "/ParkserviceAdmin",
            name: "ParkserviceAdmin",
            component: ParkserviceAdmin
        }, {
            path: "/Approval",
            name: "Approval",
            component: Approval
        }, {
            path: "/ApprovalShow",
            name: "ApprovalShow",
            component: ApprovalShow
        }, {
            path: "/ParkManage",
            name: "ParkManage",
            component: ParkManage
        }, {
            path: "/ReserveFund",
            name: "ReserveFund",
            component: ReserveFund
        }, {
            path: "/Finance",
            name: "Finance",
            component: Finance
        }, {
            path: "/IncomeDate",
            name: "IncomeDate",
            component: IncomeDate
        }, {
            path: "/ExpenditureData",
            name: "ExpenditureData",
            component: ExpenditureData
        }, {
            path: "/patrolGarden",
            name: "patrolGarden",
            component: patrolGarden
        },  {
            path: "/patrolGardenAdd",
            name: "patrolGardenAdd",
            component: patrolGardenAdd
        },  {
            path: "/patrolGardenShow",
            name: "patrolGardenShow",
            component: patrolGardenShow
        },  {
            path: "/patrolGardenList",
            name: "patrolGardenList",
            component: patrolGardenList
        }, {
            path: "/Statistics",
            name: "Statistics",
            component: Statistics
        }, {
            path: "/Articlewages",
            name: "Articlewages",
            component: Articlewages
        }, {
            path: "/Studentfile",
            name: "Studentfile",
            component: Studentfile
        }, {
            path: "/Addthestudent",
            name: "Addthestudent",
            component: Addthestudent
        }, {
            path: "/Teach",
            name: "Teach",
            component: Teach
        }, {
            path: "/TaskManagement",
            name: "TaskManagement",
            component: Task
        }, , {
            path: "/financial",
            name: "financial",
            component: Financial
        }, {
            path: "/Describe",
            name: "Describe",
            component: Describe
        }, {
            path: "/Targetmanage",
            name: "Targetmanage",
            component: Targetmanage
        }, {
            path: "/Smartmoment",
            name: "Smartmoment",
            component: Smartmoment
        }, {
            path: "/Homeproduced",
            name: "Homeproduced",
            component: Homeproduced
        }, {
            path: "/CheckWork",
            name: "CheckWork",
            component: CheckWork
        }, {
            path: "/SettlementDetails",
            name: "SettlementDetails",
            component: SettlementDetails
        }, {
            path: "/CleverInstantaneous",
            name: "CleverInstantaneous",
            component: CleverInstantaneous
        }, {
            path: "/AddHomeproduced",
            name: "AddHomeproduced",
            component: AddHomeproduced
        }, {
            path: '/Pay',
            name: "Pay",
            component: Pay
        }
    ]
});