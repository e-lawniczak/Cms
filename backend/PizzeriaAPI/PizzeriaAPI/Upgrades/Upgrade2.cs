using NHibernate;
using System.Data.Common;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Upgrades
{
	public class Upgrade2 : IUpgrade
	{
		public int Number => 2;

		public void Execute(ISession session)
		{
			CreateTableProduct(session);
			CreateTableGallery(session);
			CreateTablePicture(session);
			CreateTableGalleryPicture(session);
			CreateTableSiteContent(session);
			CreateForeignConstraints(session);
		}
		private void CreateForeignConstraints(ISession session)
		{
			var siteContentToProduct = "ALTER TABLE SITECONTENT " +
				"ADD CONSTRAINT FK_PRODUCT " +
				"FOREIGN KEY (PRODUCTID) " +
				"REFERENCES PRODUCT(PRODUCTID);";

			session.CreateSQLQuery(siteContentToProduct).ExecuteUpdate();

			var siteContentToSiteContent = "ALTER TABLE SITECONTENT " +
				"ADD CONSTRAINT FK_SITECONTENT " +
				"FOREIGN KEY (SUBSITECONTENTID) " +
				"REFERENCES SITECONTENT(SITECONTENTID);";

			session.CreateSQLQuery(siteContentToSiteContent).ExecuteUpdate();

			var siteContentToMainPicture = "ALTER TABLE SITECONTENT " +
				"ADD CONSTRAINT FK_MAINPICTURE " +
				"FOREIGN KEY (MAINPICTUREID) " +
				"REFERENCES PICTURE(PICTUREID);";
			session.CreateSQLQuery(siteContentToMainPicture).ExecuteUpdate();

			var siteContentToSubPicture = "ALTER TABLE SITECONTENT " +
				"ADD CONSTRAINT FK_SUBPICTURE " +
				"FOREIGN KEY (SUBPICTUREID) " +
				"REFERENCES PICTURE(PICTUREID);";

			session.CreateSQLQuery(siteContentToSubPicture).ExecuteUpdate();

			var galleryPictureToGallery= "ALTER TABLE GALLERYPICTURE " +
				"ADD CONSTRAINT FK_GALLERY " +
				"FOREIGN KEY (GALLERYID) " +
				"REFERENCES GALLERY(GALLERYID);";
			
			session.CreateSQLQuery(galleryPictureToGallery).ExecuteUpdate();

			var galleryPictureToPicture = "ALTER TABLE GALLERYPICTURE " +
				"ADD CONSTRAINT FK_PICTURE " +
				"FOREIGN KEY (PICTUREID) " +
				"REFERENCES PICTURE(PICTUREID);";

			session.CreateSQLQuery(galleryPictureToPicture).ExecuteUpdate();

		}
		private void CreateTableProduct(ISession session)
		{
			var sql =
			"CREATE TABLE IF NOT EXISTS PRODUCT" +
			"(" +
				"PRODUCTID INT PRIMARY KEY NOT NULL, " +
				"PRODUCTNAME TEXT NOT NULL, " +
				"PRODUCTPRICE INT NOT NULL, " +
				"PRODUCTDESCRIPTION TEXT, " +
				"PRODUCTDISCOUNTPRICE INT" +
			");";

			session.CreateSQLQuery(sql).ExecuteUpdate();
		}

		private void CreateTableGallery(ISession session)
		{
			var sql = "CREATE TABLE IF NOT EXISTS GALLERY" +
				"(" +
					"GALLERYID INT PRIMARY KEY NOT NULL, " +
					"GALLERYNAME TEXT NOT NULL, " +
					"MAINTEXT TEXT NOT NULL, " +
					"SUBTEXT TEXT, " +
					"LINK TEXT" +
				");";
			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
		private void CreateTablePicture(ISession session)
		{
			var sql = "CREATE TABLE IF NOT EXISTS PICTURE" +
				"(" +
					"PICTUREID INT PRIMARY KEY NOT NULL, " +
					"PICTURENAME TEXT NOT NULL, " +
					"FILE BYTEA NOT NULL, " +
					"CREATEDATE DATE NOT NULL" +
				");";
			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
		private void CreateTableGalleryPicture(ISession session)
		{
			var sql = "CREATE TABLE IF NOT EXISTS GALLERYPICTURE" +
				"(" +
					"GALLERYID INT NOT NULL, " +
					"PICTUREID INT NOT NULL, " +
					"PRIMARY KEY (GALLERYID, PICTUREID)" +
				");";  
			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
		private void CreateTableSiteContent(ISession session)
		{
			var sql = "CREATE TABLE IF NOT EXISTS SITECONTENT" +
				"(" +
					"SITECONTENTID INT PRIMARY KEY NOT NULL, " +
					"MAINTEXT TEXT, " +
					"SUBTEXT TEXT, " +
					"ALTSUBTEXT TEXT, " +
					"LINK TEXT, " +
					"TYPE INT NOT NULL, " +
					"PAGE INT, " +
					"ISVISIBLE BOOLEAN NOT NULL, " +
					"PRODUCTID INT, " +
					"MAINPICTUREID INT, " +
					"SUBPICTUREID INT, " +
					"SUBSITECONTENTID INT" +
				");";
			session.CreateSQLQuery(sql).ExecuteUpdate();
		}
	}
}
