library(jsonlite)
library(dplyr)

json_data <- jsonlite:fromJSON("us-maternal-mortality-race.json")

total_data <- json_data$`Race and Hispanic origin and age`$Total
under_25_data <- json_data$`Race and Hispanic origin and age`$`Under 25`
age_25_39_data <- json_data$`Race and Hispanic origin and age`$`25-39`
age_40_and_over_data <- json_data$`Race and Hispanic origin and age`$`40 and over`
asian_non_hispanic_data <- json_data$`Race and Hispanic origin and age`$`Asian, Non-Hispanic`
non_hispanic_black_data <- json_data$`Race and Hispanic origin and age`$`Non-Hispanic Black`
non_hispanic_white_data <- json_data$`Race and Hispanic origin and age`$`Non-Hispanic White`
hispanic_data <- json_data$`Race and Hispanic origin and age`$Hispanic

combined_data <- dplyr::bind_rows(
  lapply(list(total_data, under_25_data, age_25_39_data, age_40_and_over_data,
              asian_non_hispanic_data, non_hispanic_black_data, non_hispanic_white_data, hispanic_data),
         function(data) {
           data$Category <- sub(".*", names(data), 1)  # Add the category name to each row
           data
         })
)

race_categories <- c("Total", "Asian, Non-Hispanic", "Non-Hispanic Black", "Non-Hispanic White", "Hispanic")

csv_data <- combined_data |>
    dplyr::filter(Category %in% race_categories) |>
    dplyr::mutate(rate_100k = `Maternal Mortality Rate`) |>
    dplyr::select(Category, Year, rate_100k)

cat(readr::format_csv(csv_data))
