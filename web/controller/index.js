const UserController = require('./user');
const ChatController = require('./chat');
const InvoiceController = require('./invoice');
const JobController = require('./job');
const RoleController = require('./role');
const PortfolioController = require('./portfolio');
const QuotationController = require('./quotation');
const MailedQuotationController = require('./mailedQuotation');
const NotificationController = require('./notification');
const ClientController = require('./client');
const SettingController = require('./setting');
const EnquiryController = require('./enquiry');
const CategoryController = require('./category');
const PermissionController = require('./permission');

module.exports = {
    UserController,
    ChatController,
    InvoiceController,
    JobController,
    RoleController,
    PortfolioController,
    QuotationController,
    MailedQuotationController,
    NotificationController,
    ClientController,
    SettingController,
    EnquiryController,
    CategoryController,
    PermissionController
}