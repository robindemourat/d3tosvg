[Wip] JSON-based svg static data visualizations generator
=============

This is a tiny webtool aiming at connecting google spreadsheets and static data files to svg datavis generators.
It has been built for allowing a smoother workflow between data experts and designers, without loosing fine tuning possibilities hidden by generic datavis tools. 

Workflow of the tool : 

* The data expert works with her data in a google spreadsheet instance
* Data expert and designer set together the list of datasets and visualizations they want. Designer writes them in a codified form in a 'directory.json' file (in `app/data`). Visualizations are basically defined in terms of layout and parameters mapping.
* The designer refines the visualizations filters and options visually within app GUI
* When satisfied, visualizations can be downloaded as svg for further infographics work.

Courtesy of : see bower.json

Inspired notably by RAW from DensityDesign : http://raw.densitydesign.org/


Example of a `directory.json` file:

```json
{
	"dataSources" : [
				{
					"name" : "Base locale",
					"type" : "csv",
					"url" : "/data/base.csv"
				}
			],
	"visualisations" : [
			{
				"name" : "Test visualisation - date de diffusion vs thématique de l'adaptation",
				"vis_type" : "linechart",
				"data_source" : "Base locale",
				"data_type" : "time",
				"timedata" : "date",
				"timeformat" : "%m/%d/%Y",
				"objects" : "type",
				"file_name" : "testvisualisation",
				"timespan" : "year"
			},
			{
				"name" : "Test visualisation - date de diffusion vs chaîne de l'adaptation",
				"vis_type" : "linechart",
				"data_source" : "Base locale",
				"data_type" : "time",
				"timedata" : "date",
				"timeformat" : "%m/%d/%Y",
				"objects" : "chaîne",
				"file_name" : "testvisualisations",
				"timespan" : "year",
				"showObjects" : ["TF1", "FR3"]
			}

	]
}
```
