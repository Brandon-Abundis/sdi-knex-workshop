# sdi-knex-workshop

<img src="src/img/Screenshot 2026-03-19 095715.png" width="600" />

# Table setup
## makes
| id | name |
| :--- | :--- |
| 1 | Toyota |
| 2 | Subaru |
| 3 | Honda |

<br>

## models
| id | name | make_id |
| :--- | :--- | :--- |
| 1 | Supra | 1 |
| 2 | Camery | 1 |
| 3 | Outback | 2 |
| ... | ... | ... |

## vehicles
| id | vin | year | horse_power | color | mpg | model_id |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2T1BURHE0JC043821 | 2023 | 382hp | Black | 26 | 2 |
| 2 | 1HGBH41JXMN109186 | 2022 | 203hp | White | 32 | 1 |
| 3 | 3FADP4EJ0EM196587 | 2021 | 182hp | Blue | 30 | 3 |
| ... | ... | ... |

<br>
<br>

# Endpoints for table
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/makes` | List all manufacturers |
| **GET** | `/makes/vehicles` | View all cars with their details |
| **GET** | `/makes/:make` | 	Get all models for a specific make (e.g. `/makes/toyota`)details |
| **POST** | `/vehicle` | Add a new car to the fleet |

<br />

<br />

# POST JSON Example
copy and paste this for the raw json to test the post endpoint.
```json
{
  "vin": "JT2JA82J0V0012345",
  "year": 1998,
  "horse_power": "320hp",
  "color": "Renaissance Red",
  "mpg": 18,
  "model_id": 1
}
```