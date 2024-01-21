using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Upgrades
{
    public class Upgrade2 : IUpgrade
    {
        public int Number => 2;

        public void Execute(ISession session)
        {
            CreateTableKeyValue(session);
            CreateTableMenuElement(session);
            CreateTableController(session);
            CreateTableActionType(session);
            CreateTableUser(session);
            CreateTableEvent(session);
            CreateTablePicture(session);

            CreateTableEntityWithPicture(session);
            CreateTableGallery(session);
            CreateTablePage(session);
            CreateTableTabSlider(session);
            CreateTableInformationTab(session);
            CreateTableBanner(session);
            CreateTableSlider(session);
            CreateTableCategory(session);
            CreateTableProduct(session);
            CreateTableSocialMedia(session);
            CreateTableTeamMember(session);
            CreateTableRole(session);
            CreateTableTestimonial(session);
            CreateTableContactInfo(session);
            CreateTableEntityPicture(session);
            CreateForeignConstraints(session);
        }

        private void CreateTableEntityWithPicture(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS ENTITYWITHPICTURE" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "CREATIONDATE TIMESTAMP NOT NULL, " +
                        "MODIFICATIONDATE TIMESTAMP NOT NULL, " +
                        "isvisible BOOLEAN NOT NULL, " +
                        "ISDELETED BOOLEAN NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableContactInfo(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS CONTACTINFO" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "TEXT TEXT NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableTestimonial(ISession session)
        {

            var sql =
                    "CREATE TABLE IF NOT EXISTS TESTIMONIAL" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "FIRSTNAME TEXT NOT NULL, " +
                        "LASTNAME TEXT NOT NULL, " +
                        "TEXT TEXT NOT NULL, " +
                        "ROLEID INT NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableRole(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS ROLE" +
                    "(" +
                        "ROLEID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL, " +
                        "CREATIONDATE TIMESTAMP NOT NULL, " +
                        "MODIFICATIONDATE TIMESTAMP NOT NULL, " +
                        "isvisible BOOLEAN NOT NULL, " +
                        "ISDELETED BOOLEAN NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableTeamMember(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS TEAMMEMBER" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "FIRSTNAME TEXT NOT NULL, " +
                        "LASTNAME TEXT NOT NULL, " +
                        "ROLEID INT NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableSocialMedia(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS SOCIALMEDIA" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL, " +
                        "LINK TEXT NOT NULL, " +
                        "ISMAIN BOOLEAN NOT NULL, " +
                        "TEAMMEMBERID INT" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableProduct(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS PRODUCT" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL UNIQUE, " +
                        "PRICE FLOAT NOT NULL, " +
                        "DESCRIPTION TEXT, " +
                        "DISCOUNTPRICE FLOAT, " +
                        "SCORE FLOAT, " +
                        "ISRECOMMENDED BOOLEAN NOT NULL, " +
                        "CATEGORYID INT NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();

        }

        private void CreateTableCategory(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS CATEGORY" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL UNIQUE, " +
                        "LINK TEXT" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableSlider(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS SLIDER" +
                    "(" +
                        "SLIDERID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL UNIQUE, " +
                        "CREATIONDATE TIMESTAMP NOT NULL, " +
                        "MODIFICATIONDATE TIMESTAMP NOT NULL, " +
                        "isvisible BOOLEAN NOT NULL, " +
                        "ISDELETED BOOLEAN NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableBanner(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS BANNER" +
                    "(" +
                        "ID INT PRIMARY KEY NOT NULL, " +
                        "TITLE TEXT NOT NULL UNIQUE, " +
                        "TEXT TEXT NOT NULL, " +
                        "SUBTEXT TEXT, " +
                        "LINK TEXT, " +
                        "SLIDERID INT" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableInformationTab(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS INFORMATIONTAB" +
                    "(" +
                        "INFORMATIONTABID INT PRIMARY KEY NOT NULL, " +
                        "TITLE TEXT NOT NULL UNIQUE, " +
                        "TEXT TEXT NOT NULL, " +
                        "BUTTONTEXT TEXT NOT NULL, " +
                        "TABSLIDERID INT NOT NULL, " +
                        "CREATIONDATE TIMESTAMP NOT NULL, " +
                        "MODIFICATIONDATE TIMESTAMP NOT NULL, " +
                        "isvisible BOOLEAN NOT NULL, " +
                        "ISDELETED BOOLEAN NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableTabSlider(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS TABSLIDER" +
                        "(" +
                            "ID INT PRIMARY KEY NOT NULL, " +
                            "TITLE TEXT NOT NULL UNIQUE" +
                        ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTablePage(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS PAGE" +
                        "(" +
                            "ID INT PRIMARY KEY NOT NULL, " +
                            "TITLE TEXT UNIQUE, " +
                            "CONTENT TEXT" +
                        ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableGallery(ISession session)
        {
            var sql =
                                "CREATE TABLE IF NOT EXISTS GALLERY" +
                                "(" +
                                    "ID INT PRIMARY KEY NOT NULL, " +
                                    "NAME TEXT NOT NULL UNIQUE, " +
                                    "MAINTEXT TEXT, " +
                                    "SUBTEXT TEXT" +
                                ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableEntityPicture(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS ENTITYPICTURE" +
                    "(" +
                        "ENTITYWITHPICTUREID INT NOT NULL, " +
                        "PICTUREID INT NOT NULL, " +
                        "PRIMARY KEY (ENTITYWITHPICTUREID, PICTUREID)" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();

        }
        private void CreateTablePicture(ISession session)
        {
            var sql =
                    "CREATE TABLE IF NOT EXISTS PICTURE" +
                    "(" +
                        "PICTUREID INT PRIMARY KEY NOT NULL, " +
                        "NAME TEXT NOT NULL UNIQUE, " +
                        "Link TEXT, " +
                        "FILEPATH TEXT NOT NULL, " +
                        "RESIZEDFILEPATH TEXT NOT NULL, " +
                        "CREATIONDATE TIMESTAMP NOT NULL, " +
                        "MODIFICATIONDATE TIMESTAMP NOT NULL" +
                    ");";
            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableEvent(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS EVENT" +
                        "(" +
                            "CONTROLLERID INT NOT NULL, " +
                            "ACTIONTYPEID INT NOT NULL, " +
                            "ENTITYID INT NOT NULL, " +
                            "USERID	INT NOT NULL, " +
                            "MESSAGE TEXT NOT NULL, " +
                            "CREATIONDATE TIMESTAMP NOT NULL, " +
                            "MODIFICATIONDATE TIMESTAMP NOT NULL," +
                            "PRIMARY KEY (CONTROLLERID, ACTIONTYPEID, ENTITYID)" +
                        ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableUser(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS \"User\"" +
                        "(" +
                            "USERID INT PRIMARY KEY NOT NULL, " +
                            "EMAIL TEXT NOT NULL UNIQUE, " +
                            "PASSWORD TEXT NOT NULL, " +
                            "CREATIONDATE TIMESTAMP NOT NULL, " +
                            "MODIFICATIONDATE TIMESTAMP NOT NULL" +
                        ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableActionType(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS ACTIONTYPE" +
                        "(" +
                            "ACTIONTYPEID INT PRIMARY KEY NOT NULL, " +
                            "TYPE TEXT NOT NULL" +
                        ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableController(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS CONTROLLER" +
                        "(" +
                            "CONTROLLERID INT PRIMARY KEY NOT NULL, " +
                            "NAME TEXT NOT NULL" +
                        ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableMenuElement(ISession session)
        {
            var sql =
                        "CREATE TABLE IF NOT EXISTS MENUELEMENT" +
                        "(" +
                            "MENUELEMENTID INT PRIMARY KEY NOT NULL, " +
                            "TEXT TEXT NOT NULL, " +
                            "LINK TEXT NOT NULL, " +
                            "PARENTMENUELEMENTID Int, " +
                            "CREATIONDATE TIMESTAMP NOT NULL, " +
                            "MODIFICATIONDATE TIMESTAMP NOT NULL, " +
                            "ISVISIBLE BOOLEAN NOT NULL, " +
                            "ISDELETED BOOLEAN NOT NULL" +
                        ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }

        private void CreateTableKeyValue(ISession session)
        {
            var sql =
            "CREATE TABLE IF NOT EXISTS KEYVALUE" +
            "(" +
                "ID INT PRIMARY KEY NOT NULL, " +
                "KEY TEXT  NOT NULL UNIQUE, " +
                "VALUE TEXT NOT NULL" +
            ");";

            session.CreateSQLQuery(sql).ExecuteUpdate();
        }


        private void CreateForeignConstraints(ISession session)
        {
            var menuElementToMenuElement = "ALTER TABLE MENUELEMENT " +
                "ADD CONSTRAINT FK_MENUELEMENT_TO_MENUELEMENT " +
                "FOREIGN KEY (PARENTMENUELEMENTID) " +
                "REFERENCES MENUELEMENT(MENUELEMENTID);";

            session.CreateSQLQuery(menuElementToMenuElement).ExecuteUpdate();


            var bannerToEnitityWithPicture = "ALTER TABLE BANNER " +
                "ADD CONSTRAINT FK_BANNER_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(bannerToEnitityWithPicture).ExecuteUpdate();

            var bannerToSlider = "ALTER TABLE BANNER " +
                "ADD CONSTRAINT FK_BANNER_TO_SLIDER " +
                "FOREIGN KEY (SLIDERID) " +
                "REFERENCES SLIDER(SLIDERID);";

            session.CreateSQLQuery(bannerToSlider).ExecuteUpdate();

            var categoryToEntityWithPicture = "ALTER TABLE CATEGORY " +
                "ADD CONSTRAINT FK_CATEGORY_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(categoryToEntityWithPicture).ExecuteUpdate();


            var contactInfoToEntityWithPicture = "ALTER TABLE CONTACTINFO " +
                "ADD CONSTRAINT FK_CONTACTINFO_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(contactInfoToEntityWithPicture).ExecuteUpdate();

            var entityPictureToEntityWithPicture = "ALTER TABLE ENTITYPICTURE " +
                "ADD CONSTRAINT FK_ENTITYPICTURE_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ENTITYWITHPICTUREID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(entityPictureToEntityWithPicture).ExecuteUpdate();

            var entityPictureToPicture = "ALTER TABLE ENTITYPICTURE " +
                "ADD CONSTRAINT FK_ENTITYPICTURE_TO_PICTURE " +
                "FOREIGN KEY (PICTUREID) " +
                "REFERENCES PICTURE(PICTUREID);";

            session.CreateSQLQuery(entityPictureToPicture).ExecuteUpdate();

            var eventToActionType = "ALTER TABLE EVENT " +
                "ADD CONSTRAINT FK_EVENT_TO_ACTIONTYPE " +
                "FOREIGN KEY (ACTIONTYPEID) " +
                "REFERENCES ACTIONTYPE(ACTIONTYPEID);";

            session.CreateSQLQuery(eventToActionType).ExecuteUpdate();

            var eventToController = "ALTER TABLE EVENT " +
                "ADD CONSTRAINT FK_EVENT_TO_CONTROLLER " +
                "FOREIGN KEY (CONTROLLERID) " +
                "REFERENCES CONTROLLER(CONTROLLERID);";

            session.CreateSQLQuery(eventToController).ExecuteUpdate();

            var eventToUser = "ALTER TABLE EVENT " +
                "ADD CONSTRAINT FK_EVENT_TO_USER " +
                "FOREIGN KEY (USERID) " +
                "REFERENCES \"User\"(USERID);";

            session.CreateSQLQuery(eventToUser).ExecuteUpdate();

            var galleryToEntityWithPicture = "ALTER TABLE GALLERY " +
                "ADD CONSTRAINT FK_GALLERY_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(galleryToEntityWithPicture).ExecuteUpdate();

            var informationTabToTabSlider = "ALTER TABLE INFORMATIONTAB " +
                "ADD CONSTRAINT FK_INFORMATIONTAB_TO_TABSLIDER " +
                "FOREIGN KEY (TABSLIDERID) " +
                "REFERENCES TABSLIDER(ID) ON DELETE CASCADE;";

            session.CreateSQLQuery(informationTabToTabSlider).ExecuteUpdate();


            var pageToEntityWithPicture = "ALTER TABLE PAGE " +
                "ADD CONSTRAINT FK_PAGE_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";

            session.CreateSQLQuery(pageToEntityWithPicture).ExecuteUpdate();


            var productToCategory = "ALTER TABLE PRODUCT " +
                "ADD CONSTRAINT FK_PRODUCT_TO_CATEGORY " +
                "FOREIGN KEY (CATEGORYID) " +
                "REFERENCES CATEGORY(ID);";
            session.CreateSQLQuery(productToCategory).ExecuteUpdate();

            var productToEntityWithPicture = "ALTER TABLE PRODUCT " +
                "ADD CONSTRAINT FK_PRODUCT_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";
            session.CreateSQLQuery(productToEntityWithPicture).ExecuteUpdate();


            var socialMediaToEntityWithPicture = "ALTER TABLE SOCIALMEDIA " +
                "ADD CONSTRAINT FK_SOCIALMEDIA_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";
            session.CreateSQLQuery(socialMediaToEntityWithPicture).ExecuteUpdate();

            var socialMediaToTeamMember = "ALTER TABLE SOCIALMEDIA " +
                "ADD CONSTRAINT FK_PRODUCT_TO_TEAMMEMBER " +
                "FOREIGN KEY (TEAMMEMBERID) " +
                "REFERENCES TEAMMEMBER(ID);";
            session.CreateSQLQuery(socialMediaToTeamMember).ExecuteUpdate();

            var tabSliderToEntityWithPicture = "ALTER TABLE TABSLIDER " +
                "ADD CONSTRAINT FK_TABSLIDER_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";
            session.CreateSQLQuery(tabSliderToEntityWithPicture).ExecuteUpdate();


            var teamMemberToEntityWithPicture = "ALTER TABLE TEAMMEMBER " +
                "ADD CONSTRAINT FK_TEAMMEMBER_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";
            session.CreateSQLQuery(teamMemberToEntityWithPicture).ExecuteUpdate();



            var teamMemberToRole = "ALTER TABLE TEAMMEMBER " +
                "ADD CONSTRAINT FK_TEAMMEMBER_TO_ROLE " +
                "FOREIGN KEY (ROLEID) " +
                "REFERENCES ROLE(ROLEID);";
            session.CreateSQLQuery(teamMemberToRole).ExecuteUpdate();

            var testimonialToEntityWithPicture = "ALTER TABLE TESTIMONIAL " +
                "ADD CONSTRAINT FK_TESTIMONIAL_TO_ENTITYWITHPICTURE " +
                "FOREIGN KEY (ID) " +
                "REFERENCES ENTITYWITHPICTURE(ID);";
            session.CreateSQLQuery(testimonialToEntityWithPicture).ExecuteUpdate();

            var testimonialToRole = "ALTER TABLE TESTIMONIAL " +
                "ADD CONSTRAINT FK_TESTIMONIAL_TO_ROLE " +
                "FOREIGN KEY (ROLEID) " +
                "REFERENCES ROLE(ROLEID);";
            session.CreateSQLQuery(testimonialToRole).ExecuteUpdate();

        }
    }
}
