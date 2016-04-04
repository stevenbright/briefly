<#macro element name attributes>
<div class="catalog-element">
  <h3>${name}</h3>
  <#list attribute as attributes>
    <p>${attribute.name}:&nbsp;
      <#list attribute.entries as attributeEntry>
        <span>${attributeEntry.name}</span>
      </#list>
    </p>
  </#list>
  <hr/>
</div>
</#macro>

<#macro list catalogElementList>
<#list catalogElementList as catalogElement>
<@element name=catalogElement.name attributes=catalogElement.attributes/>
</#list>
</#macro>
