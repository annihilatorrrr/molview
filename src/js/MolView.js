/*!
MolView v2.2 (http://molview.org)
Copyright (c) 2014, Herman Bergwerf
ALL RIGHTS RESERVED
*/
"use strict";

var MolView = {
	layout: "",
	touch: false,
	mobile: false,
	height: 0,//used to detect virtual keyboard
	trigger: "click",
	query: {},
	loadDefault: true,
	
	init: function()
	{		
		if(this.query.q || this.query.smiles || this.query.cid || this.query.pdbid || this.query.codid)
			this.loadDefault = false;
		
		this.touch = isTouchDevice();
		if(this.touch) $(document.body).addClass("touch");
		this.mobile = isMobile();
		this.height = window.innerHeight;
		
		if(this.mobile && !Detector.webgl)
			$("#proteins-search").hide();
		
		$("#menu > .inner").css("min-width", $("#main-menu").width() + $("#search").width() + 3);
		
		Progress.init();
		if(this.loadDefault)
		{
			Progress.clear();
			Progress.setSteps(2);
		}
		
		History.init();
		Link.init();
		ChemicalData.init();
		
		//window events		
		$(window).on("resize", function()
		{
			//don't resize for virtual keyboard (common on touch devices)
			if(!(document.activeElement.id == "search-input" && MolView.touch))
			{
				Sketcher.resize();
				Model.resize();
			}
			else//virtual keyboard
			{
				if(window.innerHeight > MolView.height)
				//virtual keyboard is closed
				{
					$("#search-input").blur();
				}
				
				MolView.height = window.innerHeight;
			}
		});
		
		//dropdown events
		$(".dropdown-toggle").on(this.trigger, function(e)
		{
			e.stopPropagation();
			$(".dropdown-toggle").not(this).parent().removeClass("open");
			
			var scope = this;
			if($(this).parent().hasClass("open"))
			{
				window.setTimeout(function()
				{
					$(scope).parent().removeClass("open");
					$("#menu").removeClass("open");
				}, 100);
			}
			else
			{
				$(scope).parent().addClass("open");
				$("#menu").addClass("open");
			}
		});
		
		$(".dropdown-menu a").on(this.trigger, function(e)
		{
			if($(this).hasClass("disabled"))
				e.stopImmediatePropagation();
			else
			{
				var scope = this;
				window.setTimeout(function()
				{
					$(".dropdown-toggle").not(scope).parent().removeClass("open");
					$("#menu").removeClass("open");
				}, 100);
			}
		});
		
		$(window).on(this.trigger, function(e)
		{
			var container = $(".dropdown.open .dropdown-menu");
			var form = $("#search");

			if(!container.is(e.target) && container.has(e.target).length === 0)
			{
				window.setTimeout(function()
				{
					container.parent().removeClass("open");
					$("#menu").removeClass("open");
				}, 100);
			}
			
			if(!form.is(e.target) && form.has(e.target).length === 0
				&& document.activeElement.id == "search-input")
				$("#search-input").blur();
		});
		
		//window events
		$("#window-layer").on("mousedown", function(e)
		{			
			var target = e.target || e.srcElement;
			if(window.getSelection().type != "Range" && !$(document.activeElement).is("input"))
			{
				if($(target).is(this))
				{
					MolView.hideWindows();
					window.getSelection().removeAllRanges();
				}
			}
		});
		
		$("#window-layer .dialog .btn.close").on(this.trigger, function(e)
		{
			MolView.hideWindows();
		});
		
		//enable expandable expanding
		$(".expandable .title").on(this.trigger, function(e)
		{
			$(this).parent().toggleClass("open");
		});
		
		//form		
		$("#search-input-wrap").on(this.trigger, function()
		{
			$("#search-input").focus();
		});
		
		//initialize
		Messages.init();
		Request.init();
		
		Sketcher.init();
		if(this.loadDefault) Progress.increment();
		
		if(this.touch && !Detector.webgl)
			Actions.jmol_render_minimal();
		
		Model.init(function()
		{
			
			//actions
			$("#window-sketcher").on(this.trigger, Actions.window_sketcher);
			$("#window-model").on(this.trigger, Actions.window_model);
			$("#window-vsplit").on(this.trigger, Actions.window_vsplit);
			$("#window-hsplit").on(this.trigger, Actions.window_hsplit);
			
			$("#mv-help").on(this.trigger, Actions.help);
			$("#mv-about").on(this.trigger, Actions.about);
			
			$("#mv-share").on(this.trigger, Actions.share);
			$("#mv-embed").on(this.trigger, Actions.embed);
			
			$("#export-2d").on(this.trigger, Actions.export_2D);
			$("#export-3d").on(this.trigger, Actions.export_3D);
			$("#save-local-3d").on(this.trigger, function(){ Actions.save_local_3D(Loader.lastQuery.name); });
			
			$("#data-properties").on(this.trigger, Actions.data_properties);
			$("#data-spectra").on(this.trigger, Actions.data_spectra);
			
			$("#search-substructure").on(this.trigger, Actions.search_substructure);
			$("#search-superstructure").on(this.trigger, Actions.search_superstructure);
			$("#search-similarity").on(this.trigger, Actions.search_similarity);
			
			$("#model-reset").on(this.trigger, Actions.model_reset);
			
			$("#model-balls").on(this.trigger, Actions.model_balls);
			$("#model-stick").on(this.trigger, Actions.model_stick);
			$("#model-vdw").on(this.trigger, Actions.model_vdw);
			$("#model-wireframe").on(this.trigger, Actions.model_wireframe);
			$("#model-line").on(this.trigger, Actions.model_line);
			
			$("#cif-unit-cell").on(this.trigger, Actions.cif_unit_cell);
			$("#cif-2x2x2-cell").on(this.trigger, Actions.cif_2x2x2_cell);
			$("#cif-1x3x3-cell").on(this.trigger, Actions.cif_1x3x3_cell);
			
			$("#engine-glmol").on(this.trigger, Actions.engine_glmol);
			$("#engine-jmol").on(this.trigger, Actions.engine_jmol);
			$("#engine-cdw").on(this.trigger, Actions.engine_cdw);
			
			$("#jmol-clean").on(this.trigger, Actions.jmol_clean);
			$("#mep-lucent").on(this.trigger, Actions.mep_lucent);
			$("#mep-opaque").on(this.trigger, Actions.mep_opaque);
			$("#vdw-surface").on(this.trigger, Actions.vdw_surface);
			$("#jmol-charge").on(this.trigger, Actions.jmol_charge);
			$("#bond-dipoles").on(this.trigger, Actions.bond_dipoles);
			$("#net-dipole").on(this.trigger, Actions.net_dipole);
			$("#jmol-minimize").on(this.trigger, Actions.jmol_minimize);
			
			$("#measure-distance").on(this.trigger, Actions.measure_distance);
			$("#measure-angle").on(this.trigger, Actions.measure_angle);
			$("#measure-torsion").on(this.trigger, Actions.measure_torsion);
			
			$("#jmol-render-all").on(this.trigger, Actions.jmol_render_all);
			$("#jmol-render-normal").on(this.trigger, Actions.jmol_render_normal);
			$("#jmol-render-minimal").on(this.trigger, Actions.jmol_render_minimal);
			
			$("#search").on("submit", Actions.fast_search);
			$("#pubchem-search").on("click", Actions.pubchem_search);
			$("#proteins-search").on("click", Actions.proteins_search);
			$("#crystals-search").on("click", Actions.crystals_search);
			
			$("#show-search-results, #menu-show-search-results").on(this.trigger, Actions.show_search_results);
			$("#hide-search-results, #menu-hide-search-results").on(this.trigger, Actions.hide_search_results);
			
			$("#load-more-compounds").on(this.trigger, Actions.load_more_compounds);
			$("#load-more-proteins").on(this.trigger, Actions.load_more_proteins);
			$("#load-more-crystals").on(this.trigger, Actions.load_more_crystals);
			
			$("#me-clean").on(this.trigger, Actions.clean);
			$("#resolve").on(this.trigger, Actions.resolve);
			$("#me-info").on(this.trigger, Actions.about);
			
			$("#start-help").on(this.trigger, Actions.help);
			
			$("#png-current-spectrum").on(this.trigger, Actions.png_current_spectrum);
			$("#jcamp-current-spectrum").on(this.trigger, Actions.jcamp_current_spectrum);
			
			if(this.loadDefault)
			{
				Progress.complete();
				Progress.hide();
			}
			
			//execute query commands
			this.executeQuery();
			Sketcher.markUpdated();
			
			if(!Request.ChemicalIdentifierResolver.available)
				Messages.alert("cir_down");
		}.bind(this), Detector.webgl ? "GLmol" : "JSmol");
	},
	
	executeQuery: function()
	{
		$.each(this.query, function(key, value)
		{
			if(key == "q")
			{
				$("#search-input").val(value);
				
				if(MolView.query.search)
				{
					if(MolView.query.search == "fast")
						Actions.fast_search();
					else if(MolView.query.search == "pubchem")
						Actions.pubchem_search();
					else if(MolView.query.search == "proteins")
						Actions.proteins_search();
				}
				else Actions.fast_search();
			}
			else if(key == "smiles")
			{
				Messages.process(function()
				{
					Loader.loadSMILES(value, document.title);
				}, "compound");
			}
			else if(key == "cid")
			{
				Loader.Compounds.loadCID(value, document.title);
			}
			else if(key == "pdbid")
			{
				Loader.Proteins.loadPDBID(value, value.toUpperCase());
			}
			else if(key == "codid")
			{
				Loader.Crystals.loadCODID(value, document.title);
			}
			else if(key == "dialog")
			{
				MolView.showDialog(value);
			}
			else if(key == "mode")
			{
				if(value == "balls") Actions.model_balls();
				if(value == "stick") Actions.model_stick();
				if(value == "vdw") Actions.model_vdw();
				if(value == "wireframe") Actions.model_wireframe();
				if(value == "line") Actions.model_line();
			}
		});
	},

	showDialog: function(name)
	{
		$("#window-layer").show();
		$("#window-layer").scrollTop(0);
		$("#" + name + "-dialog").show();
	},

	hideWindows: function()
	{
		$("#window-layer .dialog").hide();
		$("#window-layer").hide();
	},

	setLayout: function(layout)
	{
		$("#window-sketcher").removeClass("selected");
		$("#window-model").removeClass("selected");
		$("#window-vsplit").removeClass("selected");
		$("#window-hsplit").removeClass("selected");
		
		if(layout == "sketcher") $("#window-sketcher").addClass("selected");
		if(layout == "model") $("#window-model").addClass("selected");
		if(layout == "vsplit") $("#window-vsplit").addClass("selected");
		if(layout == "hsplit") $("#window-hsplit").addClass("selected");
		
		$("#content").removeClass("sketcher model vsplit hsplit").addClass(layout);		
		this.layout = layout;
		
		Sketcher.resize();
		Model.resize();
	},
	
	makeModelVisible: function()
	{
		if(this.layout == "sketcher")
			MolView.setLayout("both");
	},
	
	search_input_timeout: null,
	alertEmptyInput: function()
	{
		if(MolView.search_input_timeout != null)
			window.clearTimeout(MolView.search_input_timeout);
			
		$("#search-input").addClass("alert");
		MolView.search_input_timeout = window.setTimeout(function()
		{
			$("#search-input").removeClass("alert");
		}, 1000);
	}
};

$(window).on("load", function()
{
	MolView.init();
});
