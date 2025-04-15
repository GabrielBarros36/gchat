use sqlx::PgPool;
use crate::utils::types::TempGroupsInfo;
use chrono::{DateTime, Utc};

use crate::utils::queries::create_group;

pub async fn fetch_temp_chat(chat_key: String, db: &PgPool) -> Result<TempGroupsInfo, sqlx::Error> {
    sqlx::query_as!(
        TempGroupsInfo,
        r#"
        SELECT tgi.temp_chat_key, tgi.group_id, tgi.end_date, tgi.password, g.name
        FROM temp_groups_info tgi
        JOIN groups g ON tgi.group_id = g.id
        WHERE temp_chat_key = $1
        "#,
        chat_key
    )
    .fetch_one(db)
    .await
}

pub async fn create_temp_chat(chat_key: String, name: String, end_date: DateTime<Utc>, password: Option<String>, db: &PgPool) -> Result<String, sqlx::Error> {
    let created_group_id = create_group(name, 3, db).await?;
    
    let result = sqlx::query!(
        r#"
        INSERT INTO temp_groups_info (temp_chat_key, group_id, end_date, password)
        VALUES ($1, $2, $3, $4)
        RETURNING temp_chat_key
        "#,
        chat_key, created_group_id, end_date, password
    ).fetch_one(db).await?;

    Ok(result.temp_chat_key)
}

pub async fn get_temp_info_with_group_id(group_id: i32, db: &PgPool) -> Result<TempGroupsInfo, sqlx::Error> {
    sqlx::query_as!(
        TempGroupsInfo,
        r#"
        SELECT g.name, tgi.temp_chat_key, tgi.group_id, tgi.end_date, tgi.password
        FROM groups g
        JOIN temp_groups_info tgi ON g.id = tgi.group_id
        WHERE group_id = $1
        "#,
        group_id
    )
    .fetch_one(db)
    .await
}
