from functools import lru_cache

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "GovTrack India API"
    environment: str = "development"
    database_url: str = "sqlite:///./govtrack.db"
    jwt_secret: str = "dev-secret"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    frontend_url: AnyHttpUrl | str = "http://localhost:3000"
    cors_origins: str = "http://localhost:3000"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
