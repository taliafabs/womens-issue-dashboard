# library(rvest)
# library(dplyr)
# library(readr)

# url <- "https://www.cdc.gov/nchs/data/hestat/maternal-mortality/2022/maternal-mortality-rates-2022.html"
# rvest::webpage <- read_html(url)

# table <- webpage |>
#   html_nodes("table") |>
#   .[[1]] |>
#   html_table(fill = TRUE)

#   cat(readr::format_csv(tablr))
