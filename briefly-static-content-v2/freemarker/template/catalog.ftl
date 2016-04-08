<#macro element id name attributes>
<div class="catalog-element">
  <a href="/g/detail/${id?c}"><h3>${name}</h3></a>
  <#list attributes as attribute>
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
<@element id=catalogElement.id name=catalogElement.name attributes=catalogElement.attributes/>
</#list>
</#macro>
