library(data.table)
library(dplyr)
library(readr)

g7_countries <- c("Canada", "United States", "United Kingdom", "France", "Germany", "Japan")

# get the maternal mortality data in g7 countries from 1970-2020
maternal_mortality_g7 <- read_csv(".data/number-of-maternal-deaths-by-region.csv") |>
    dplyr::filter(Entity %in% g7_countries, year >= 1970) |>
    dplyr::mutate(rate_100k = `Estimated maternal deaths`)|>
    dplyr::select(Entity, year, rate_100k)

cat(readr::format_csv(maternal_mortality_g7))
